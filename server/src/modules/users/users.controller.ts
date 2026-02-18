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
  BadRequestUUIDParams, ForbiddenResponse,
} from "@/common";

import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import * as UserDto from "./dto";
import {UsersService} from "./users.service";
import type {AccessRequest, ApiResponse, UserResponse} from "@/types";

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
  @ApiOkResponse({type: UserDto.GetMeOkResponse})
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
  @ApiBadRequestResponse({
    type: BadRequestUUIDParams,
    description: 'Validation failed. Ensure the ID is a valid UUIDv4.'
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: 'Invalid or missing authentication token.'
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
    description: 'when target user not access to get user'
  })
  @ApiNotFoundResponse({
    type: UserDto.NotFoundGetUserResponse,
    description: 'The requested user does not exist in the database.'
  })
  findOne(
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ): Promise<ApiResponse<UserResponse>> {
    return this.usersService.findOne(params.id);
  }

  /**
   * Assign Role to Users ID.
   * Admins only endpoint. Validates UUID format.
   */
  @Permission({
    permissions: [PERMISSIONS.ROLE_ASSIGN]
  })
  @Post(":id/roles")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'assigned role to users',
    description: 'Assigns a role to a user. **Note: Even with role.assign permission, modifying managers or assigning management roles is restricted to Owners only.**',
    operationId: 'assign_role',
    tags: ["User"],
  })
  @ApiParam(UUID4Dto("user"))
  @ApiBody({type: UserDto.UserRoleAssignedDto})
  @ApiOkResponse({type: UserDto.RoleAssignOkRes})
  @ApiBadRequestResponse({
    type: BadRequestUUIDParams,
    description: 'Validation failed. Ensure the ID is a valid UUIDv4.'
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: 'Invalid or missing authentication token.'
  })
  @ApiForbiddenResponse({
    type: UserDto.UserRoleAssignedForbiddenRes,
    description: 'Access denied: Target user or new role is a manager/owner or requester lacks sufficient rank.'
  })
  @ApiNotFoundResponse({
    type: UserDto.NotFoundGetUserResponse,
    description: 'The requested user or role does not exist in the database.'
  })
  @ApiConflictResponse({
    type: UserDto.UserRoleAssignedConflictRes,
    description: 'Conflict: The user already possesses this role.'
  })
  async assignRole(
    @Req() req: AccessRequest,
    @Body(new ZodPipe(UserDto.UserRoleAssigned)) data: UserDto.UserRoleAssignedType,
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ): Promise<ApiResponse<UserResponse>> {
    return await this.usersService.assignRole(req.user, params.id, data.roleId);
  }
}