import z from 'zod';
import {createZodDto} from "nestjs-zod";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";
import {UserResponse} from "@/types";
import {createUserResponse} from "@/modules/auth/dto";

/** request body */
export const UserRoleAssigned = z.object({
  roleId: z.array(z.uuidv4({error: "invalid role id"})),
});

/** request body type */
export type UserRoleAssignedType = z.infer<typeof UserRoleAssigned>;

const userResponse = structuredClone(createUserResponse);

userResponse.data.user.roles = [
  "self",
  "user_manager"
];

userResponse.data.user.permissions = [
  "user.self",
  "user.view",
  "user.update",
  "user.delete",
  "role.assign",
  "role.create",
  "role.view",
  "role.update",
  "role.delete"
];

/** ok response */
export class RoleAssignOkRes extends getBaseOkResponseSchema<UserResponse>({
  path: "/users/4361f7f4-2759-4e24-a147-8a3a44c5b459/roles",
  create: false,
  response: {
    message: "User found successfully",
    data: userResponse.data
  }
}) {}

/** request body swagger schema */
export class UserRoleAssignedDto extends createZodDto(UserRoleAssigned) {}

/** forbidden response */
export class UserRoleAssignedForbiddenRes extends getNormalErrorResponse(
  "Management level protection: Only the owner can modify managers or assign management roles.",
  403
) {}

/** conflict body */
export class UserRoleAssignedConflictRes extends getNormalErrorResponse(
  "The user currently has this role.",
  409
) {}