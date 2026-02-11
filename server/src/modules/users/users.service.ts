import {PrismaService} from "../prisma/prisma.service";
import {UserRole} from "@/modules/prisma/generated/enums";
import {Injectable, NotFoundException} from '@nestjs/common';
import type {BaseApiResponseType, CreateUserResponse} from "@/types";

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
  ) {
    const user = await this.findOne(id);

    console.log(user);
    console.log(actionRole);

    return {
      user,
      message: 'User role found',
    };
  }
}