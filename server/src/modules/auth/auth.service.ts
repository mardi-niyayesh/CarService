import type {StringValue} from "ms";
import {JwtService} from "@nestjs/jwt";
import * as UserDto from "../users/dto";
import {PrismaService} from "../prisma/prisma.service";
import {RefreshToken, User, UserRole} from "../prisma/generated/client";
import {BaseApiResponseType, CreateUserResponse, AccessTokenPayload, SafeUser, RefreshTokenPayload} from "../../types";
import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {compareSecret, generateRefreshToken, hashSecret, hashSecretToken} from "../../lib";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES as StringValue,
    });
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

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isValidPassword: boolean = await compareSecret(loginData.password, user.password);

    if (!isValidPassword) throw new UnauthorizedException("Invalid credentials");

    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      role: user.role,
      display_name: user.display_name ?? ""
    };

    const accessToken: string = this.generateAccessToken(accessTokenPayload);
    const refreshToken: string = generateRefreshToken();

    const expiresAt: Date = new Date(
      Date.now() + (
        loginData.remember
          ? 7 * 24 * 60 * 60 * 1000 // 7 days
          : 12 * 60 * 60 * 1000     // 12 hours
      )
    );

    const hashedRefreshToken: string = hashSecretToken(refreshToken);

    await this.prisma.refreshToken.create({
      data: {
        expiresAt,
        userId: user.id,
        revokedAt: null,
        token: hashedRefreshToken,
        remember: loginData.remember,
      }
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

  /** endpoint for refresh accessToken */
  refresh(refreshPayload: RefreshTokenPayload) {
    console.log(`refresh token: `, refreshPayload);
  }
}