import {JwtService} from "@nestjs/jwt";
import * as UserDto from "../users/dto";
import {PrismaService} from "../prisma/prisma.service";
import {User, UserRole} from "../prisma/generated/client";
import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {BaseApiResponseType, CreateUserResponse, hashSecret, UserPayload} from "../../lib";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

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

  /** login users */
  async login(loginData: UserDto.LoginUserInput) {
    const user: User | null = await this.prisma.user.findFirst({
      where: {
        email: loginData.email,
      }
    });

    if (!user) throw new NotFoundException('User not found');

    const userPayload: UserPayload = {
      sub: user.id,
      role: user.role,
      remember: loginData.remember ?? false,
      display_name: user.display_name ?? "",
    };

    const refreshToken: string = this.jwtService.sign<UserPayload>(userPayload);
  }
}