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

/**
 * User management endpoints for retrieving user information.
 *
 * This controller handles:
 * - Retrieving the authenticated user's own profile
 * - Fetching specific user details by ID (for admin users)
 * - Securing endpoints with permission-based access control
 * - UUID validation for all ID parameters
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
  @ApiOperation({
    summary: 'get user info',
    description: 'get user info with id. **Access restricted to users with role: (admin or owner) only.**',
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