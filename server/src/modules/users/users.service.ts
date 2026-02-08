import * as UserDTO from "./dto";
import {User} from "../prisma/generated/client";
import {UserRole} from "../prisma/generated/enums";
import {PrismaService} from "../prisma/prisma.service";
import {BaseApiResponseType, type CreateUserResponse} from "../../lib";
import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** create user in db */
  async create(createData: UserDTO.CreateUserInput): Promise<BaseApiResponseType<CreateUserResponse>> {
    const user: User | null = await this.prisma.user.findFirst({
      where: {
        email: createData.email,
      }
    });

    if (user) throw new ConflictException('User already exists');

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