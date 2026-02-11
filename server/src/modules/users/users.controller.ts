import {
  Role,
  ZodPipe,
  UUID4Dto,
  RoleGuard,
  UUID4Schema,
  type UUID4Type,
  ForbiddenResponse,
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
  @ApiNotFoundResponse({type: UserDTO.GetUserNotFoundResponse})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }

  @Role(UserRole.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @Post(":id/role")
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  @ApiForbiddenResponse({type: ForbiddenResponse})
  changeRole(
    @Req() req: AccessRequest
  ) {
    console.log(req.user);
    return {
      role: req.user.role,
    };
  }
}