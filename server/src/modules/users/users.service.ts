import * as UserDto from "./dto";
import {isAllowedAction} from "@/lib";
import {PrismaService} from "../prisma/prisma.service";
import {UserRole} from "@/modules/prisma/generated/enums";
import type {BaseApiResponseType, CreateUserResponse} from "@/types";
import {ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** get user info
   * - only users with role (SUPER_ADMIN or ADMIN) can accessibility to this route
   */
  async findOne(id: string): Promise<BaseApiResponseType<CreateUserResponse>> {
    const user = await this.prisma.user.findFirst({
      where: {
        id
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User found successfully',
      data: {
        user: {
          ...user,
          password: undefined
        }
      },
    };
  }

  /** change user role
   * - only users with role (SUPER_ADMIN) can accessibility to this route
   */
  async userRole(
    id: string,
    actionRole: UserRole,
    data: UserDto.ChangeRoleInput,
  ): Promise<BaseApiResponseType<CreateUserResponse>> {
    const user = await this.findOne(id);

    const userRole = user.data.user.role;
    const newRole = data.role;

    const isAllowed: boolean = isAllowedAction({
      actionRole,
      targetRole: userRole,
      roleComparison: "higher"
    });

    if (!isAllowed) throw new ForbiddenException({
      message: "Your role not access to this action.",
      error: "Forbidden",
      statusCode: 403
    });

    if (newRole === userRole) throw new ConflictException({
      message: `The user already has the role ${newRole}`,
      error: "Conflict",
      statusCode: 409
    });

    return {
      message: 'User role found',
      data: {
        user: user.data.user
      },
    };
  }
}

{
  void `
    actionRole:  SUPER_ADMIN
    newRole:  USER
  `;
}