import * as UserDTO from "./dto";
import {UsersService} from "./users.service";
import {ApiBody, ApiCreatedResponse} from "@nestjs/swagger";
import {UUID4Schema, type UUID4Type, ZodPipe} from "../../common";
import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({type: UserDTO.CreateUserSchema})
  @ApiCreatedResponse({
    type: UserDTO.CreateUserOkResponse
  })
  create(
    @Body(new ZodPipe(UserDTO.CreateUser)) data: UserDTO.CreateUserInput
  ) {
    return this.usersService.create(data);
  }

  @Get()
  @ApiBody({})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    console.log(params);
    return {
      ok: true,
    };
  }
}