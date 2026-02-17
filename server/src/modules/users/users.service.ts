import {PrismaService} from "../prisma/prisma.service";
import type {ApiResponse, UserResponse} from "@/types";
import {Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** get user info
   * - only users with role (SUPER_ADMIN or ADMIN) can accessibility to this route
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
    ).map(p => p[0]).filter(p => p !== undefined);

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

  async assignRole(userId: string, roleId: string) {
    const user = await this.findOne(userId);
    const role = await this.prisma.role.findFirst({where: {id: roleId}});

    console.log(user);
    console.log(role);
  }
}