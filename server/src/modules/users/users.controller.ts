import {
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiCookieAuth,
} from "@nestjs/swagger";
import * as UserDTO from "./dto";
import type {Request} from "express";
import {UsersService} from "./users.service";
import {AccessGuard, RefreshGuard} from "../auth/guards/guards";
import {Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import {BadRequestUUIDParams, UUID4Dto, UUID4Schema, type UUID4Type, ZodPipe} from "../../common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessGuard)
  @UseGuards(RefreshGuard)
  @Get(":id")
  @ApiParam(UUID4Dto)
  @ApiOkResponse({type: UserDTO.GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiNotFoundResponse({type: UserDTO.GetUserNotFoundResponse})
  @ApiBearerAuth("accessToken")
  @ApiCookieAuth("refreshToken")
  findOne(
    @Req() req: Request,
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    console.log(req.headers);
    console.log(req.cookies);
    return this.usersService.findOne(params.id);
  }
}