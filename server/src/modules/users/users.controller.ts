import {ZodPipe} from "../../common";
import {ApiBody} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import * as UserValidator from "./validators/";
import {Body, Controller, HttpCode, Post} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({type: UserValidator.CreateUserSchema})
  create(
    @Body(new ZodPipe(UserValidator.CreateUser)) data: UserValidator.CreateUserInput
  ) {
    return this.usersService.create(data);
  }
}