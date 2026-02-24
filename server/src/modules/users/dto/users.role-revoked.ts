import {UserResponse} from "@/types";
import {userResponse} from "./user.role-assigned";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

/** ok response */
export class RoleRevokeOkRes extends getBaseOkResponseSchema<UserResponse>({
  path: "/users/:id/roles",
  create: false,
  response: {
    message: "Roles successfully revoked from this user.",
    data: userResponse.data
  }
}) {}

/** forbidden response */
export class UserRoleRevokedForbiddenRes extends getNormalErrorResponse({
  message: "Management level protection: You don't have enough privilege to revoke high-level roles (role_manager, user_manager).",
  statusCode: 403,
  error: "Permission Denied",
  path: "users/:id/roles"
}) {}