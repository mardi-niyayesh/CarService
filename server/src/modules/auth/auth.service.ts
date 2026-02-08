import type {StringValue} from "ms";
import {hashSecret} from "../../lib";
import {randomUUID} from "node:crypto";
import * as UserDto from "../users/dto";
import {PrismaService} from "../prisma/prisma.service";
import {JwtService, JwtSignOptions} from "@nestjs/jwt";
import {User, UserRole} from "../prisma/generated/client";
import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {BaseApiResponseType, CreateUserResponse, AccessTokenPayload, CreateTokenParams, RefreshTokenPayload} from "../../types";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  generateToken(data: CreateTokenParams): string {
    const options: JwtSignOptions = {
      secret: data.tokenType === "access"
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_REFRESH_SECRET,
      expiresIn: data.tokenType === "access"
        ? process.env.JWT_ACCESS_EXPIRES_1H as StringValue
        : data.remember
          ? process.env.JWT_REFRESH_EXPIRES_7D as StringValue
          : process.env.JWT_REFRESH_EXPIRES_12H as StringValue
    };

    return this.jwtService.sign(data.payload, options);
  }

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

    const userRefreshPayload: RefreshTokenPayload = {
      sub: user.id,
      type: "refresh",
      jti: randomUUID(),
      remember: loginData.remember ?? false,
    };

    const refreshToken: string = this.generateToken({
      tokenType: "refresh",
      payload: userRefreshPayload,
      remember: loginData.remember ?? false,
    });

    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      type: "access",
      role: user.role,
      display_name: user.display_name ?? ""
    };

    const accessToken: string = this.generateToken({
      payload: accessTokenPayload,
      tokenType: "access",
    });

    return {
      user: {
        ...user,
        password: undefined,
      },
      accessToken,
      refreshToken,
    };
  }
}