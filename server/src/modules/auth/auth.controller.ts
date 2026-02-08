import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import {ZodPipe} from "../../common";
import type {Response} from "express";
import * as UserDto from "../users/dto";
import {AuthService} from "./auth.service";
import {BaseApiResponseType, CreateUserResponse} from "../../types";
import {Body, Controller, HttpCode, Post, Res} from '@nestjs/common';

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
  @ApiBody({type: UserDto.CreateUserSchema})
  @ApiCreatedResponse({type: UserDto.CreateUserOkResponse})
  @ApiBadRequestResponse({type: UserDto.CreateUserBadRequestResponse})
  @ApiConflictResponse({type: UserDto.CreateUserConflictResponse})
  register(
    @Body(new ZodPipe(UserDto.CreateUser)) data: UserDto.CreateUserInput
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
  @ApiBody({type: UserDto.LoginUserSchema})
  @ApiBadRequestResponse({type: UserDto.LoginUserBadRequestResponse})
  @ApiNotFoundResponse({type: UserDto.GetUserNotFoundResponse})
  async login(
    @Body(new ZodPipe(UserDto.LoginUser)) data: UserDto.LoginUserInput,
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
}