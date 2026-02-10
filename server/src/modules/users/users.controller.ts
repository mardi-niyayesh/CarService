import {
  Role,
  ZodPipe,
  UUID4Dto,
  RoleGuard,
  UUID4Schema,
  type UUID4Type,
  UnauthorizedResponse,
  BadRequestUUIDParams,
} from "@/common";

import {
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import * as UserDTO from "./dto";
import {UsersService} from "./users.service";
import {UserRole} from "@/modules/prisma/generated/enums";
import {Controller, Get, Param, UseGuards} from '@nestjs/common';

@Controller('users')
@ApiBearerAuth("accessToken")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get(":id")
  @ApiParam(UUID4Dto)
  @ApiOkResponse({type: UserDTO.GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  @ApiNotFoundResponse({type: UserDTO.GetUserNotFoundResponse})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }
}