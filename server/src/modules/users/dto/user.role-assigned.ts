import z from 'zod';
import {createZodDto} from "nestjs-zod";
import {getNormalErrorResponse} from "@/common";

/** request body */
export const UserRoleAssigned = z.object({
  roleId: z.uuidv4({error: "invalid role id"}),
}).overwrite(data => ({roleId: data.roleId.trim()}));

/** request body type */
export type UserRoleAssignedType = z.infer<typeof UserRoleAssigned>;

/** request body swagger schema */
export class UserRoleAssignedDto extends createZodDto(UserRoleAssigned) {}

/** forbidden response */
export class UserRoleAssignedForbiddenRes extends getNormalErrorResponse(
  "Management level protection: You cannot modify roles for other managers or owners.",
  403
) {}

/** conflict body */
export class UserRoleAssignedConflictRes extends getNormalErrorResponse(
  "The user currently has this role.",
  409
) {}