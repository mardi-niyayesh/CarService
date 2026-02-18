import {
  Req,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import {
  ZodPipe,
  UUID4Dto,
  PERMISSIONS,
  Permission,
  UUID4Schema,
  type UUID4Type,
  UnauthorizedResponse,
  BadRequestUUIDParams,
} from "@/common";

import {
  ApiBody,
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

/**
 * User management endpoints for retrieving user information.
 *
 * This controller handles:
 * - Retrieving the authenticated user's own profile
 * - Fetching specific user details by ID (for admin users)
 * - Securing endpoints with permission-based access control
 * - UUID validation for all ID parameters
 * - Assigning or Revoked roles to users by 'owner' or 'role_manager' roles
 *
 * All endpoints require authentication via Bearer token.
 */
@ApiTags("User")
@Controller('users')
@ApiBearerAuth("accessToken")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get current user profile.
   * Requires authentication and "user.self" permission.
   */
  @Permission({
    permissions: [PERMISSIONS.USER_SELF]
  })
  @Get("get-me")
  @HttpCode(HttpStatus.OK)
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

  /**
   * Get user by ID.
   * Admin only endpoint. Validates UUID format.
   */
  @Permission({
    permissions: [PERMISSIONS.USER_VIEW]
  })
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'get user info',
    description: 'get user info with id. **Access restricted to users with permission: (owner or user.view) only.**',
    operationId: 'get_user',
    tags: ["User"],
  })
  @ApiParam(UUID4Dto("user"))
  @ApiOkResponse({type: UserDto.GetUserOkResponse})
  @ApiBadRequestResponse({type: BadRequestUUIDParams})
  @ApiUnauthorizedResponse({type: UnauthorizedResponse})
  @ApiNotFoundResponse({type: UserDto.NotFoundGetUserResponse})
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    return this.usersService.findOne(params.id);
  }

  /**
   * Assign Role to Users ID.
   * Admins only endpoint. Validates UUID format.
   */
  @Permission({
    permissions: []
  })
  @Post(":id/roles")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'assigned role to user',
    description: 'assigned role to user with id. **Access restricted to users with permission: (owner) only.**',
    operationId: 'assign_role',
    tags: ["User"],
  })
  @ApiParam(UUID4Dto("user"))
  @ApiBody({type: UserDto.UserRoleAssignedDto})
  async assignRole(
    @Body(new ZodPipe(UserDto.UserRoleAssigned)) data: UserDto.UserRoleAssignedType,
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    await this.usersService.assignRole(params.id, data.roleId);

    return {
      test: params.id,
      msg: "successfully assigned.",
    };
  }
}