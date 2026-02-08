import {
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiCookieAuth,
} from "@nestjs/swagger";
import * as UserDTO from "./dto";
import {UsersService} from "./users.service";
import {Controller, Get, Param} from '@nestjs/common';
import {BadRequestUUIDParams, UUID4Dto, UUID4Schema, type UUID4Type, ZodPipe} from "../../common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  @ApiParam(UUID4Dto)
  @ApiOkResponse({type: UserDTO.GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiNotFoundResponse({type: UserDTO.GetUserNotFoundResponse})
  @ApiBearerAuth("accessToken")
  @ApiCookieAuth("refreshToken")
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }
}