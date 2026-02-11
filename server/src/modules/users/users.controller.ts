import {
  Role,
  ZodPipe,
  UUID4Dto,
  RoleGuard,
  UUID4Schema,
  type UUID4Type,
  ForbiddenResponse,
  BadRequestUUIDParams,
  UnauthorizedResponse,
  getUserNotFoundResponse,
} from "@/common";

import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import * as UserDto from "./dto";
import type {AccessRequest} from "@/types";
import {UsersService} from "./users.service";
import {UserRole} from "@/modules/prisma/generated/enums";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards} from '@nestjs/common';

@ApiTags("User")
@Controller('users')
@ApiBearerAuth("accessToken")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
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
  @ApiNotFoundResponse({type: getUserNotFoundResponse("User")})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }

  @Role(UserRole.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post(":id/role")
  @ApiOperation({
    summary: 'change user role',
    description: 'change user role with id. **Access restricted to users with role: (SUPER_ADMIN) only.**',
    operationId: 'change_user_role',
    tags: ["User"],
  })
  @ApiParam(UUID4Dto)
  @ApiBody({type: UserDto.ChangeRoleSchema})
  @ApiBadRequestResponse({type: UserDto.BadRequestChangeRoleResponse})
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  @ApiForbiddenResponse({type: ForbiddenResponse})
  @ApiNotFoundResponse({type: getUserNotFoundResponse("User")})
  changeRole(
    @Req() req: AccessRequest,
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
    @Body(new ZodPipe(UserDto.ChangeRole)) data: UserDto.ChangeRoleInput
  ) {
    return this.usersService.userRole(params.id, req.user.role, data);
  }
}