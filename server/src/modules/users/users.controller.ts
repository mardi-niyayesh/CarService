import * as UserDTO from "./dto";
import {UsersService} from "./users.service";
import {ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam} from "@nestjs/swagger";
import {BadRequestUUIDParams, UUID4Dto, UUID4Schema, type UUID4Type, ZodPipe} from "../../common";
import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';
import {GetUserOkResponse} from "./dto";

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
  @ApiOkResponse({type: GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }
}