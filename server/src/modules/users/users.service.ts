import * as UserDTO from "./dto";
import {BaseApiResponseType} from "../../lib";
import {UserRole} from "../prisma/generated/enums";
import {PrismaService} from "../prisma/prisma.service";
import {Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** create user in db */
  async create(createData: UserDTO.CreateUserInput): Promise<BaseApiResponseType<{
    user: UserDTO.CreateUserResponse
  }>> {
    const newUser = await this.prisma.user.create({
      data: {
        ...createData,
        role: UserRole.USER
      }
    });

    return {
      message: "user created successfully",
      data: {
        user: {
          ...newUser,
          password: undefined
        }
      }
    };
  }

  async findOne(id: string): Promise<BaseApiResponseType<{ user: UserDTO.CreateUserResponse }>> {
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