import {ROLES} from "@/common";
import {PrismaService} from "../prisma/prisma.service";
import {ApiResponse, UserAccess, UserResponse} from "@/types";
import {ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** get user info
   * - only users with role (owner or role_manager) can accessibility to this route
   */
  async findOne(id: string): Promise<ApiResponse<UserResponse>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {permission: true}
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = user.userRoles.map(r => r.role.name);

    const rolePermissions = user.userRoles.map(r => r.role.rolePermissions);

    const permissions = [...new Set(
      rolePermissions.map(rp => rp
        .map(p => p.permission.name)
      ).flat()
    )];

    const data: UserResponse = {
      user: {
        updated_at: user.updated_at,
        created_at: user.created_at,
        age: user.age,
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        roles,
        permissions
      }
    };

    return {
      message: 'User found successfully',
      data,
    };
  }

  /** Assign roles to user
   * - Accessible only by users with 'owner' or 'user_manager' role
   */
  async assignRole(
    actionPayload: UserAccess,
    userId: string,
    rolesId: string[]
  ): Promise<ApiResponse<UserResponse>> {
    const user = await this.findOne(userId);

    // Prevent self-assignment
    if (user.data.user.id === actionPayload.userId) throw new ForbiddenException({
      message: 'You cannot assign roles to yourself',
      error: "Forbidden",
      statusCode: 403,
    });

    const roles = await this.prisma.role.findMany({
      where: {
        OR: rolesId.map(r => ({id: r}))
      },
      include: {
        rolePermissions: {
          include: {permission: true}
        }
      }
    });

    // Validate all roles exist
    if (roles.length !== rolesId.length) throw new NotFoundException({
      message: 'One or many Roles does not exist',
      error: 'Not Found',
      statusCode: 404,
    });

    const restrictedRoles: string[] = [ROLES.OWNER, ROLES.SELF];
    const newRolesName: string[] = roles.map(r => r.name);

    // Block restricted roles
    if (newRolesName.some(r => restrictedRoles.includes(r))) throw new ForbiddenException({
      message: 'owner and self roles cannot be assigned',
      error: 'Forbidden',
      statusCode: 403,
    });

    const targetRoles: string[] = user.data.user.roles;

    // Check for duplicate assignments
    if (targetRoles.some(r => newRolesName.includes(r))) throw new ConflictException({
      message: 'User already has some of these roles',
      error: 'Conflict',
      statusCode: 409,
    });

    const rolesManager: string[] = [ROLES.ROLE_MANAGER, ROLES.USER_MANAGER];
    const rolesManagerStrict: string[] = structuredClone(rolesManager);
    rolesManagerStrict.push(ROLES.OWNER);

    const isActorOwner: boolean = actionPayload.roles.includes(ROLES.OWNER);
    const isTargetManager: boolean = targetRoles.some(r => rolesManagerStrict.includes(r));
    const isNewRoleManager: boolean = newRolesName.some(r => rolesManager.includes(r));

    /**
     * action role != 'owner':
     * - if new role = 'role_manager' | 'user_manager' or
     * - if target user role = 'role_manager' | 'user_manager' | 'owner'
     */
    if (!isActorOwner && (isTargetManager || isNewRoleManager)) throw new ForbiddenException({
      message: "Management level protection: Only the owner can assign management roles.",
      error: "Forbidden",
      statusCode: 403,
    });

    await this.prisma.userRole.createMany({
      data: rolesId.map(r => ({role_id: r, user_id: user.data.user.id}))
    });

    const rolesName: string[] = roles.map(r => r.name);

    const rolePermissions = roles.map(r => r.rolePermissions);

    const permissions: string[] = [...new Set(
      rolePermissions.map(rp => rp
        .map(p => p.permission.name)
      ).flat()
    )];

    user.data.user.roles.push(...rolesName);
    user.data.user.permissions.push(...permissions);

    return {
      message: "role successfully assigned to this user.",
      data: {
        user: user.data.user
      }
    };
  }
}