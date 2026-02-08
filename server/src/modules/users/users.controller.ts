import * as UserDTO from "./dto";
import {UsersService} from "./users.service";
import {ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiParam} from "@nestjs/swagger";
import {BadRequestUUIDParams, UUID4Dto, UUID4Schema, type UUID4Type, ZodPipe} from "../../common";
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

  @Get(":id")
  @ApiParam(UUID4Dto)
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    console.log(params);
    return {
      ok: true,
    };
  }
}