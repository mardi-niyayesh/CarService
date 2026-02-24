import {ROLES} from "@/common";
import {PrismaService} from "../prisma/prisma.service";
import {ApiResponse, BaseException, UserAccess, UserResponse} from "@/types";
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

    if (!user) throw new NotFoundException({
      message: "User not exist in database",
      error: "User Not Found",
    } as BaseException);

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
    return this.prisma.$transaction(async tx => {
      const userIncludes = {
        where: {
          id: userId
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
      };

      const targetUser = await tx.user.findUnique(userIncludes);

      if (!targetUser) throw new NotFoundException({
        message: "User not exist in database",
        error: "User Not Found",
      });

      const targetRoles: string[] = targetUser.userRoles.map(r => r.role.name);

      // Prevent self-assignment
      if (targetUser.id === actionPayload.userId) throw new ForbiddenException({
        message: 'You cannot assign roles to yourself',
        error: "Permission Denied",
      } as BaseException);

      const roles = await tx.role.findMany({
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
        message: 'One or many Roles does not exist in database',
        error: 'Role Not Found',
      } as BaseException);

      const restrictedRoles: string[] = [ROLES.OWNER, ROLES.SELF];
      const newRolesName: string[] = roles.map(r => r.name);

      // Block restricted roles
      if (newRolesName.some(r => restrictedRoles.includes(r))) throw new ForbiddenException({
        message: 'owner and self roles cannot be assigned',
        error: 'Permission Denied',
      } as BaseException);

      // Check for duplicate assignments
      if (targetRoles.some(r => newRolesName.includes(r))) throw new ConflictException({
        message: 'User already has some of these roles',
        error: 'Conflict User Roles',
      } as BaseException);

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
        message: "Management level protection: You don't have enough privilege to assign high-level roles (role_manager, user_manager).",
        error: "Permission Denied",
      } as BaseException);

      await tx.userRole.createMany({
        data: rolesId.map(r => ({role_id: r, user_id: targetUser.id}))
      });

      const newUserData = await tx.user.findUnique(userIncludes);

      const newTargetRoles: string[] = newUserData!.userRoles.map(r => r.role.name);

      const newTargetRolePermissions = newUserData!.userRoles.map(r => r.role.rolePermissions);

      const newTargetPermissions: string[] = [...new Set(
        newTargetRolePermissions.map(rp => rp
          .map(p => p.permission.name)
        ).flat()
      )];

      const data: UserResponse = {
        user: {
          updated_at: newUserData!.updated_at,
          created_at: newUserData!.created_at,
          age: newUserData!.age,
          id: newUserData!.id,
          email: newUserData!.email,
          display_name: newUserData!.display_name,
          roles: newTargetRoles,
          permissions: newTargetPermissions
        }
      };

      return {
        message: "roles successfully assigned to this user.",
        data
      };
    });
  }
}