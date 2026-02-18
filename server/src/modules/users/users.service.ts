import {PrismaService} from "../prisma/prisma.service";
import {ApiResponse, BaseRoles, UserAccess, UserResponse} from "@/types";
import {ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** get user info
   * - only users with role (owner or role_manager) can accessibility to this route
   */
  async findOne(id: string): Promise<ApiResponse<UserResponse>> {
    const user = await this.prisma.user.findFirst({
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

    const permissions = rolePermissions.map(rp => rp
      .map(p => p.permission.name)
    ).flat();

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

  /** Assign Role to users
   * - only users with role (owner or user_manager) can accessibility to this route
   */
  async assignRole(actionPayload: UserAccess, userId: string, roleId: string): Promise<ApiResponse<UserResponse>> {
    const user = await this.findOne(userId);

    if (user.data.user.id === actionPayload.userId) throw new ForbiddenException({
      message: "Self-modification is restricted.",
      error: "Forbidden",
      statusCode: 403,
    });

    const role = await this.prisma.role.findFirst({where: {id: roleId}});

    if (!role) throw new NotFoundException({
      message: 'Role does not exist',
      error: 'Not Found',
      statusCode: 404,
    });

    if (role.name === BaseRoles.owner.toString()) throw new ForbiddenException({
      message: 'Assigning the "owner" role is restricted and cannot be done through this endpoint.',
      error: 'Forbidden',
      statusCode: 403,
    });

    const targetRoles: string[] = user.data.user.roles;

    if (targetRoles.includes(role.name)) throw new ConflictException({
      message: 'The user currently has this role.',
      error: 'Conflict',
      statusCode: 409,
    });

    const isActorOwner: boolean = actionPayload.roles.includes(BaseRoles.owner.toString());
    const isTargetManager: boolean = targetRoles.some(r => r === BaseRoles.user_manager.toString() || r === BaseRoles.owner.toString());
    const isNewRoleManagerLevel: boolean = role.name === BaseRoles.user_manager.toString();

    if (!isActorOwner && (isTargetManager || isNewRoleManagerLevel)) throw new ForbiddenException({
      message: "Management level protection: You cannot modify roles for other managers or owner.",
      error: "Forbidden",
      statusCode: 403,
    });

    await this.prisma.userRole.upsert({
      where: {
        role_id_user_id: {
          role_id: role.id,
          user_id: user.data.user.id
        }
      },
      update: {},
      create: {
        role_id: role.id,
        user_id: user.data.user.id
      }
    });

    const newUserData = await this.findOne(userId);

    return {
      message: "role successfully assigned to this user.",
      data: {
        user: newUserData.data.user
      }
    };
  }
}