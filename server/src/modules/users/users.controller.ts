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
import {UnauthorizedResponse} from "@/common";
import {RoleGuard} from "@/modules/auth/guards/role.guard";
import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "@/modules/auth/guards/access.guard";
import {BadRequestUUIDParams, UUID4Dto, UUID4Schema, type UUID4Type, ZodPipe} from "@/common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @UseGuards(RoleGuard)
  @Get(":id")
  @ApiBearerAuth("accessToken")
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