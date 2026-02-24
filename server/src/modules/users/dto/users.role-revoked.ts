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

export class UserRevokeBadReqRes extends getNormalErrorResponse({
  message: "User does not have these roles: category_manager, product_manager",
  path: "/users/:id/roles",
  error: "Roles Not Found in Target Roles",
  statusCode: 400
}) {}

/** forbidden response */
export class UserRoleRevokedForbiddenRes extends getNormalErrorResponse({
  message: "Management level protection: You don't have enough privilege to revoke high-level roles (role_manager, user_manager).",
  statusCode: 403,
  error: "Permission Denied",
  path: "users/:id/roles"
}) {}