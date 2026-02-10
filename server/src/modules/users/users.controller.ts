import {
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import * as UserDTO from "./dto";
import type {Request} from "express";
import {UsersService} from "./users.service";
import {UnauthorizedResponse} from "@/common";
import {Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "@/modules/auth/guards/access.guard";
import {BadRequestUUIDParams, UUID4Dto, UUID4Schema, type UUID4Type, ZodPipe} from "@/common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get(":id")
  @ApiBearerAuth("accessToken")
  @ApiParam(UUID4Dto)
  @ApiOkResponse({type: UserDTO.GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  @ApiNotFoundResponse({type: UserDTO.GetUserNotFoundResponse})
  findOne(
    @Req() req: Request,
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    console.log(req.user);
    return this.usersService.findOne(params.id);
  }
}