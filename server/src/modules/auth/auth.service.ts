import path from "node:path";
import {ROLES} from "@/common";
import * as AuthDto from "./dto";
import type {StringValue} from "ms";
import {readFileSync} from "node:fs";
import {randomUUID} from "node:crypto";
import {JwtService} from "@nestjs/jwt";
import {User} from "../prisma/generated/client";
import {PrismaService} from "../prisma/prisma.service";
import {EmailService} from "@/modules/email/email.service";
import {compareSecret, generateRandomToken, hashSecret, hashSecretToken} from "@/lib";
import type {AccessTokenPayload, RefreshTokenPayload, ApiResponse, UserResponse, LoginResponse} from "@/types";
import {BadRequestException, ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  /** generate new accessToken with payload */
  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES as StringValue,
    });
  }

  /** create user in db */
  async register(createData: AuthDto.CreateUserInput): Promise<ApiResponse<UserResponse>> {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email: createData.email,
      }
    });

    if (user) throw new ConflictException('User already exists');

    const hashPassword: string = await hashSecret(createData.password);

    const selfRole = await this.prisma.role.findUnique({
      where: {
        name: ROLES.SELF
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
        password: hashPassword
      }
    });

    const roles = await this.prisma.userRole.create({
      data: {
        role_id: selfRole.id,
        user_id: newUser.id
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

    const permissions = [...new Set(
      roles.role.rolePermissions.map(p => p.permission.name)
    )];

    const data: UserResponse = {
      user: {
        roles: [roles.role.name],
        updated_at: newUser.updated_at,
        created_at: newUser.created_at,
        age: newUser.age,
        id: newUser.id,
        email: newUser.email,
        display_name: newUser.display_name,
        permissions
      }
    };

    return {
      message: "user created successfully",
      data
    };
  }

  /** login users */
  async login(loginData: AuthDto.LoginUserInput): Promise<LoginResponse & { refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {permission: true}
                }
              }
            }
          }
        }
      }
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isValidPassword: boolean = await compareSecret(loginData.password, user.password);

    if (!isValidPassword) throw new UnauthorizedException("Invalid credentials");

    const rolePermissions = user.userRoles.map(r => r.role.rolePermissions);

    const permissions = [...new Set(
      rolePermissions.map(rp => rp
        .map(p => p.permission.name)
      ).flat()
    )];

    const roles: string[] = user.userRoles.map(r => r.role.name);

    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      jti: randomUUID() + Date.now(),
      display_name: user.display_name ?? "",
      roles,
      permissions
    };

    const accessToken: string = this.generateAccessToken(accessTokenPayload);
    const refreshToken: string = generateRandomToken();

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

    return {
      user: {
        id: user.id,
        age: user.age,
        email: user.email,
        display_name: user.display_name,
        created_at: user.created_at,
        updated_at: user.updated_at,
        roles,
        permissions
      },
      accessToken,
      refreshToken,
    };
  }

  /** endpoint for refresh accessToken */
  refresh(refreshPayload: RefreshTokenPayload): string {
    const payload: AccessTokenPayload = {
      sub: refreshPayload.user.id,
      jti: randomUUID() + Date.now(),
      roles: refreshPayload.roles,
      permissions: refreshPayload.permissions,
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

  /** send email to user for reset password */
  async forgotPassword(to: string): Promise<ApiResponse<AuthDto.ForgotApiResponse>> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: to
      },
      include: {
        passwordToken: true
      }
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.passwordToken) throw new ConflictException('A password reset token is already active. Please check your email.');

    const token: string = generateRandomToken();
    const hashedToken: string = hashSecretToken(token);

    const expireMinutes: number = 15;

    await this.prisma.passwordToken.create({
      data: {
        user_id: user.id,
        token: hashedToken,
        expires_at: new Date(Date.now() + expireMinutes * 60 * 1000)
      }
    });

    const templatePath: string = path.join(process.cwd(), "public/html/forgot-password.html");

    let html: string;
    try {
      html = readFileSync(templatePath, 'utf8');

      const resetLink: string = `${process.env.CLIENT_RESET_PASSWORD}?token=${token}`;

      html = html.replace("{{resetLink}}", resetLink);
      html = html.replace("{{expireMinutes}}", expireMinutes.toString());
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to load email template',
        error: (err as Error).message,
      });
    }

    try {
      await this.emailService.sendHtmlEmail(to, html);

      return {
        message: "Email sent successfully",
        data: {
          email: to,
          time: `${expireMinutes} minutes left`,
          timeNumber: expireMinutes
        }
      };
    } catch (e) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (e as Error).message || 'Failed to send reset password email',
        error: (e as Error).name || "Internal Server Error",
      });
    }
  }

  /** Reset password with token */
  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    const hashedToken: string = hashSecretToken(token);

    const findToken = await this.prisma.passwordToken.findFirst({
      where: {token: hashedToken},
      include: {user: true}
    });

    if (!findToken) throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Reset password token is invalid or has expired.',
      error: "Not Found"
    });

    if (findToken.expires_at < new Date()) throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'The reset password token has expired. Please request a new one.',
      error: 'TokenExpired'
    });

    const newPassword: string = await hashSecret(password);

    await this.prisma.user.update({
      where: {
        id: findToken.user.id
      },
      data: {
        password: newPassword
      }
    });

    return {
      message: "Password reset successfully",
    };
  }
}