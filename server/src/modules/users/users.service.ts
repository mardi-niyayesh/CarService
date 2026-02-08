import {PrismaService} from "../prisma/prisma.service";
import {Injectable, NotFoundException} from '@nestjs/common';
import {BaseApiResponseType, type CreateUserResponse} from "../../lib";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
}