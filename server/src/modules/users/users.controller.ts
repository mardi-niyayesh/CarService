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

import * as UserDTO from "./dto";
import {UsersService} from "./users.service";
import {UserRole} from "@/modules/prisma/generated/enums";
import {Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import type {AccessRequest} from "@/types";

@ApiTags("User")
@Controller('users')
@ApiBearerAuth("accessToken")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get(":id")
  @ApiParam(UUID4Dto)
  @ApiOperation({
    summary: 'get user info',
    description: 'get user info with id. **Access restricted to users with role: (SUPER_ADMIN or ADMIN) only.**',
    operationId: 'get_user',
    tags: ["User"],
  })
  @ApiOkResponse({type: UserDTO.GetUserOkResponse})
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
  @Post(":id/role")
  @ApiParam(UUID4Dto)
  @ApiOperation({
    summary: 'change user role',
    description: 'change user role with id. **Access restricted to users with role: (SUPER_ADMIN) only.**',
    operationId: 'change_user_role',
    tags: ["User"],
  })
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  @ApiForbiddenResponse({type: ForbiddenResponse})
  @ApiNotFoundResponse({type: getUserNotFoundResponse("User")})
  changeRole(
    @Req() req: AccessRequest,
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    console.log(req.user);
    console.log(params.id);
    return {
      role: req.user.role,
    };
  }
}