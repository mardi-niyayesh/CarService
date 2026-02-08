import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse, ApiNotFoundResponse,
} from "@nestjs/swagger";
import {ZodPipe} from "../../common";
import * as UserDto from "../users/dto";
import {AuthService} from "./auth.service";
import {Body, Controller, HttpCode, Post} from '@nestjs/common';

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
  login(
    @Body(new ZodPipe(UserDto.LoginUser)) data: UserDto.LoginUserInput,
  ) {
    return this.authService.login(data);
  }
}