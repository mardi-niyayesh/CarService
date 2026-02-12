import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCookieAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
} from "@nestjs/swagger";

import * as AuthDto from "./dto";
import type {Response} from "express";
import {AuthService} from "./auth.service";
import {RefreshTokenGuard, ZodPipe, TooManyRequestResponse, Public} from "@/common";
import {Body, Controller, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import type {RefreshRequest, BaseApiResponseType, CreateUserResponse, SafeUser} from "@/types";

/**
 * Authentication endpoints for user registration, login, and token refresh.
 *
 * This controller handles:
 * - Creating new user accounts
 * - Authenticating users with email/password
 * - Issuing access tokens
 * - Refreshing access tokens using secure httpOnly cookies
 */
@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Creating new user accounts
   */
  @Post("register")
  @HttpCode(201)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user record in the database and returns the created user.',
    operationId: 'auth_register',
    tags: ["Auth"],
  })
  @ApiBody({type: AuthDto.CreateUserSchema})
  @ApiCreatedResponse({type: AuthDto.CreateUserOkResponse})
  @ApiBadRequestResponse({type: AuthDto.CreateUserBadRequestResponse})
  @ApiConflictResponse({type: AuthDto.CreateUserConflictResponse})
  @ApiTooManyRequestsResponse({type: TooManyRequestResponse})
  register(
    @Body(new ZodPipe(AuthDto.CreateUser)) data: AuthDto.CreateUserInput
  ) {
    return this.authService.register(data);
  }

  /**
   * Authenticating users with email/password and Issuing access tokens
   */
  @Post("login")
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Validates user credentials and returns an access token. Also sets a secure httpOnly refresh token cookie.',
    operationId: 'auth_login',
    tags: ["Auth"],
  })
  @ApiBody({type: AuthDto.LoginUserSchema})
  @ApiOkResponse({type: AuthDto.LoginUserOkResponse})
  @ApiBadRequestResponse({type: AuthDto.LoginUserBadRequestResponse})
  @ApiUnauthorizedResponse({type: AuthDto.LoginUserInvalidAuthResponse})
  async login(
    @Body(new ZodPipe(AuthDto.LoginUser)) data: AuthDto.LoginUserInput,
    @Res({passthrough: true}) res: Response
  ): Promise<BaseApiResponseType<CreateUserResponse & { accessToken: string }>> {
    const loginResponse = await this.authService.login(data);

    res.cookie("refreshToken", loginResponse.refreshToken, {
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      maxAge: data.remember
        ? 7 * 24 * 60 * 60 * 1000
        : 12 * 60 * 60 * 1000
    });

    return {
      message: "user logged in successfully",
      data: {
        user: loginResponse.user,
        accessToken: loginResponse.accessToken,
      }
    };
  }

  /** Refreshing access tokens using secure httpOnly cookies */
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(200)
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Uses the refresh token (from httpOnly cookie) to generate a new access token.',
    operationId: 'auth_refresh',
    tags: ["Auth"],
  })
  @ApiCookieAuth("refreshToken")
  @ApiOkResponse({type: AuthDto.RefreshUsersOkResponse})
  @ApiUnauthorizedResponse({type: AuthDto.RefreshUsersUnAuthResponse})
  refresh(
    @Req() req: RefreshRequest
  ): BaseApiResponseType<{ accessToken: string; user: SafeUser }> {
    const accessToken: string = this.authService.refresh(req.refreshPayload);

    return {
      message: "accessToken successfully created.",
      data: {
        user: req.refreshPayload.user,
        accessToken,
      }
    };
  }
}