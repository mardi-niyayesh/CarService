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
import {ZodPipe} from "@/common";
import type {Response} from "express";
import * as AuthDto from "./dto/index";
import {AuthService} from "./auth.service";
import {RefreshTokenGuard} from "./guards/refresh.guard";
import {Body, Controller, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import type {RefreshRequest, BaseApiResponseType, CreateUserResponse, SafeUser} from "@/types";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Create a new User in users table
   */
  @Post("register")
  @HttpCode(201)
  @ApiOperation({
    summary: "Register user",
    description: `Register user in database, users table`,
    operationId: "registerUser",
  })
  @ApiBody({type: AuthDto.CreateUserSchema})
  @ApiCreatedResponse({type: AuthDto.CreateUserOkResponse})
  @ApiBadRequestResponse({type: AuthDto.CreateUserBadRequestResponse})
  @ApiConflictResponse({type: AuthDto.CreateUserConflictResponse})
  @ApiTooManyRequestsResponse({type: AuthDto.TooManyRequestResponse})
  register(
    @Body(new ZodPipe(AuthDto.CreateUser)) data: AuthDto.CreateUserInput
  ) {
    return this.authService.register(data);
  }

  /**
   * login user with email and password
   */
  @Post("login")
  @ApiOperation({
    summary: "Login user",
    description: `Login user with email and password`,
    operationId: "loginUser",
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

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(200)
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