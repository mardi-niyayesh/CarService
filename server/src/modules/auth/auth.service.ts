import * as AuthDto from "./dto";
import type {StringValue} from "ms";
import {randomUUID} from "node:crypto";
import {JwtService} from "@nestjs/jwt";
import {User} from "../prisma/generated/client";
import {PrismaService} from "../prisma/prisma.service";
import {ConflictException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {compareSecret, generateRefreshToken, hashSecret, hashSecretToken} from "@/lib";
import {CreateUserResponse, AccessTokenPayload, RefreshTokenPayload, ApiResponse, SafeUser} from "@/types";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  /** generate new accessToken with payload */
  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES as StringValue,
    });
  }

  /** create user in db */
  async register(createData: AuthDto.CreateUserInput): Promise<ApiResponse<CreateUserResponse>> {
    const user: User | null = await this.prisma.user.findFirst({
      where: {
        email: createData.email,
      }
    });

    if (user) throw new ConflictException('User already exists');

    const hashPassword: string = await hashSecret(createData.password);

    const selfRole = await this.prisma.role.findFirst({
      where: {
        name: "self"
      }
    });

    if (!selfRole) throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'self role not exist',
      error: "Internal Server Error"
    });

    const newUser = await this.prisma.user.create({
      data: {
        ...createData,
        password: hashPassword,
        role_id: selfRole.id
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
  async login(loginData: AuthDto.LoginUserInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginData.email,
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {permission: true}
            }
          }
        }
      }
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isValidPassword: boolean = await compareSecret(loginData.password, user.password);

    if (!isValidPassword) throw new UnauthorizedException("Invalid credentials");

    const permissions: string[] = user.role.rolePermissions.map(p => p.permission.name);

    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      permissions,
      jti: randomUUID() + Date.now(),
      role: user.role.name,
      display_name: user.display_name ?? "",
    };

    const accessToken: string = this.generateAccessToken(accessTokenPayload);
    const refreshToken: string = generateRefreshToken();

    const expires_at: Date = new Date(
      Date.now() + (
        loginData.remember
          ? 7 * 24 * 60 * 60 * 1000 // 7 days
          : 12 * 60 * 60 * 1000     // 12 hours
      )
    );

    const hashedRefreshToken: string = hashSecretToken(refreshToken);

    await this.prisma.refreshToken.create({
      data: {
        expires_at,
        user_id: user.id,
        revoked_at: null,
        token: hashedRefreshToken,
        remember: loginData.remember,
      }
    });

    const safeUser: SafeUser = {
      id: user.id,
      age: user.age,
      email: user.email,
      role_id: user.role_id,
      display_name: user.display_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  /** endpoint for refresh accessToken */
  refresh(refreshPayload: RefreshTokenPayload): string {
    const payload: AccessTokenPayload = {
      sub: refreshPayload.user.id,
      jti: randomUUID() + Date.now(),
      permissions: refreshPayload.permissions,
      role: refreshPayload.role,
      display_name: refreshPayload.user.display_name ?? "",
    };

    return this.generateAccessToken(payload);
  };

  /** revoked refresh token and logout */
  async logout(refreshPayload: RefreshTokenPayload): Promise<ApiResponse<void>> {
    await this.prisma.refreshToken.update({
      where: {
        id: refreshPayload.refreshRecord.id
      },
      data: {
        revoked_at: new Date()
      }
    });

    return {
      message: "user logout successfully"
    };
  }
}