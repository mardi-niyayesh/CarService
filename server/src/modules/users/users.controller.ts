import {
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import * as UserDTO from "./dto";
import {UsersService} from "./users.service";
import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';
import {BadRequestUUIDParams, UUID4Dto, UUID4Schema, type UUID4Type, ZodPipe} from "../../common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({type: UserDTO.CreateUserSchema})
  @ApiCreatedResponse({type: UserDTO.CreateUserOkResponse})
  @ApiBadRequestResponse({type: UserDTO.CreateUserBadRequestResponse})
  @ApiConflictResponse({type: UserDTO.CreateUserConflictResponse})
  create(
    @Body(new ZodPipe(UserDTO.CreateUser)) data: UserDTO.CreateUserInput
  ) {
    return this.usersService.create(data);
  }

  @Get(":id")
  @ApiParam(UUID4Dto)
  @ApiOkResponse({type: UserDTO.GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiNotFoundResponse({type: UserDTO.GetUserNotFoundResponse})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }
}