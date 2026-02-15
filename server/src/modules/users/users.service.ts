import {PrismaService} from "../prisma/prisma.service";
import type {ApiResponse, CreateUserResponse} from "@/types";
import {Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** get user info
   * - only users with role (SUPER_ADMIN or ADMIN) can accessibility to this route
   */
  async findOne(id: string): Promise<ApiResponse<CreateUserResponse>> {
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
}