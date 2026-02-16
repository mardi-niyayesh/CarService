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
      include: {role: true}
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const data: UserResponse = {
      user: {
        role: user.role.name,
        updated_at: user.updated_at,
        created_at: user.created_at,
        age: user.age,
        id: user.id,
        email: user.email,
        display_name: user.display_name,
      }
    };

    return {
      message: 'User found successfully',
      data,
    };
  }
}