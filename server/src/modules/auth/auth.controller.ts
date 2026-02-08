import {ZodPipe} from "../../common";
import * as UserDto from "../users/dto";
import {AuthService} from "./auth.service";
import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** create user in db */
  @Post("register")
  @HttpCode(201)
  @ApiBody({type: UserDto.CreateUserSchema})
  @ApiCreatedResponse({type: UserDto.CreateUserOkResponse})
  @ApiBadRequestResponse({type: UserDto.CreateUserBadRequestResponse})
  @ApiConflictResponse({type: UserDto.CreateUserConflictResponse})
  register(
    @Body(new ZodPipe(UserDto.CreateUser)) data: UserDto.CreateUserInput
  ) {
    return this.authService.register(data);
  }
}