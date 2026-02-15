import {
  ZodPipe,
  UUID4Dto,
  Permission,
  UUID4Schema,
  type UUID4Type,
  UnauthorizedResponse,
  BadRequestUUIDParams,
} from "@/common";

import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import * as UserDto from "./dto";
import type {AccessRequest} from "@/types";
import {UsersService} from "./users.service";
import {Controller, Get, Param, Req} from '@nestjs/common';

@ApiTags("User")
@Controller('users')
@ApiBearerAuth("accessToken")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Permission({
    permissions: ["user.self"]
  })
  @Get("get-me")
  @ApiOperation({
    summary: 'get user info',
    description: 'get user info accessToken. **Access restricted to users with role: (self) only.**',
    operationId: 'get_me',
    tags: ["User"],
  })
  @ApiOkResponse({type: UserDto.GetUserOkResponse})
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  getMe(
    @Req() req: AccessRequest
  ) {
    return this.usersService.findOne(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({
    summary: 'get user info',
    description: 'get user info with id. **Access restricted to users with role: (SUPER_ADMIN or ADMIN) only.**',
    operationId: 'get_user',
    tags: ["User"],
  })
  @ApiParam(UUID4Dto)
  @ApiOkResponse({type: UserDto.GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  @ApiNotFoundResponse({type: UserDto.NotFoundGetUserResponse})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }
}