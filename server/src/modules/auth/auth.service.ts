import * as UserDto from "../users/dto";
import {PrismaService} from "../prisma/prisma.service";
import {User, UserRole} from "../prisma/generated/client";
import {ConflictException, Injectable} from '@nestjs/common';
import {BaseApiResponseType, CreateUserResponse, hashSecret} from "../../lib";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  /** create user in db */
  async register(createData: UserDto.CreateUserInput): Promise<BaseApiResponseType<CreateUserResponse>> {
    const user: User | null = await this.prisma.user.findFirst({
      where: {
        email: createData.email,
      }
    });

    if (user) throw new ConflictException('User already exists');
    
    const hashPassword: string = await hashSecret(createData.password);

    const newUser = await this.prisma.user.create({
      data: {
        ...createData,
        role: UserRole.USER,
        password: hashPassword,
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
}