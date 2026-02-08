import {ZodPipe} from "../../common";
import {ApiBody} from "@nestjs/swagger";
import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import * as UserValidator from "./validators/users.validators";

@Controller('users')
export class UsersController {
  constructor() {}

  @Post()
  @HttpCode(201)
  @ApiBody({type: UserValidator.CreateUserDto})
  create(
    @Body(new ZodPipe(UserValidator.BaseUserSchema)) data: UserValidator.CreateUserInput
  ) {
    console.log(data);
    return {
      user: "Damn ChatGPT",
    };
  }
}