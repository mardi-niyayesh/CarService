import {
  Req,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Controller, Delete,
} from '@nestjs/common';

import {
  ZodPipe,
  UUID4Dto,
  PERMISSIONS,
  Permission,
  UUID4Schema,
  type UUID4Type,
  getForbiddenResponse,
  getUnauthorizedResponse,
  getBadRequestUUIDParams,
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
  @Get("profile")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'get user info by self',
    description: 'get user info accessToken. **Access restricted to users with role: (self) only.**',
    operationId: 'get_profile',
    tags: ["User"],
  })
  @ApiOkResponse({type: UserDto.GetMeOkResponse})
  @ApiUnauthorizedResponse({type: getUnauthorizedResponse("users/profile")})
  getProfile(
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
    type: getBadRequestUUIDParams("users/:id"),
    description: 'Validation failed. Ensure the ID is a valid UUIDv4.'
  })
  @ApiUnauthorizedResponse({
    type: getUnauthorizedResponse("users/:id"),
    description: 'Invalid or missing authentication token.'
  })
  @ApiForbiddenResponse({
    type: getForbiddenResponse("users/:id"),
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
    summary: 'Assign roles to a user',
    description: `
  Assigns one or more roles to a target user with strict validation rules:

  - **Self-assignment is forbidden** (a user cannot assign roles to themselves).
  - **Restricted roles** ("owner", "self") cannot be assigned under any circumstances.
  - **Duplicate prevention**: roles already held by the user cannot be reassigned.
  - **Management-level protection**: assigning or modifying critical management roles 
  ("role_manager", "user_manager") is exclusively reserved for the "owner". 
  Other managers cannot grant these specific privileges to prevent peer-level 
  escalation, though they may assign other authorized management roles.
  - All roles must exist; invalid role IDs will result in a 404 error.

  This endpoint ensures role integrity, prevents privilege escalation, 
  and enforces organizational security policies.
  `,
    operationId: 'assign_role',
    tags: ["User"],
  })
  @ApiParam(UUID4Dto("user"))
  @ApiBody({type: UserDto.UserRoleAssignedDto})
  @ApiOkResponse({type: UserDto.RoleAssignOkRes})
  @ApiBadRequestResponse({
    type: getBadRequestUUIDParams(":id/roles"),
    description: 'Validation failed. Ensure the ID is a valid UUIDv4.'
  })
  @ApiUnauthorizedResponse({
    type: getUnauthorizedResponse(":id/roles"),
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
    return await this.usersService.assignRole(req.user, params.id, data.rolesId);
  }

  @Permission({
    permissions: [PERMISSIONS.ROLE_REVOKE]
  })
  @Post(":id/roles")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Revoked roles to a user',
    description: `
  Assigns one or more roles to a target user with strict validation rules:

  - **Self-assignment is forbidden** (a user cannot assign roles to themselves).
  - **Restricted roles** ("owner", "self") cannot be assigned under any circumstances.
  - **Duplicate prevention**: roles already held by the user cannot be reassigned.
  - **Management-level protection**: assigning or modifying critical management roles 
  ("role_manager", "user_manager") is exclusively reserved for the "owner". 
  Other managers cannot grant these specific privileges to prevent peer-level 
  escalation, though they may assign other authorized management roles.
  - All roles must exist; invalid role IDs will result in a 404 error.

  This endpoint ensures role integrity, prevents privilege escalation, 
  and enforces organizational security policies.
  `,
    operationId: 'revoke_role',
    tags: ["User"],
  })
  @ApiParam(UUID4Dto("user"))
  @ApiBody({type: UserDto.UserRoleAssignedDto})
  @Delete(":id/roles")
  revokeRole(
    @Req() req: AccessRequest,
    @Body(new ZodPipe(UserDto.UserRoleAssigned)) data: UserDto.UserRoleAssignedType,
    @Param(new ZodPipe(UUID4Schema)) params: UUID4Type,
  ) {
    console.dir(req.user, {colors: true, depth: 2, showHidden: true});
    console.dir(data.rolesId, {colors: true, depth: 2, showHidden: true});
    console.dir(params.id, {colors: true, depth: 2, showHidden: true});

    return {
      test: true
    };
  }
}