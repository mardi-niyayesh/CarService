import z from 'zod';
import {createZodDto} from "nestjs-zod";
import {type CreateUserResponse} from "@/types";
import {createUserResponse} from "@/modules/auth/dto";
import {getBaseErrorBodyResponseSchema, getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

/** Change Role schema body */
export const ChangeRole = z.object({
  role: z.string(),
});

export type ChangeRoleInput = z.infer<typeof ChangeRole>;

/** change role swagger schema */
export class ChangeRoleSchema extends createZodDto(ChangeRole) {}

/** ok request response */
export class ChangeRoleUserOkResponse extends getBaseOkResponseSchema<CreateUserResponse>({
  path: "users/id/role",
  response: {
    message: "User role updated successfully to USER",
    data: createUserResponse.data as CreateUserResponse
  }
}) {}

/** bad request response */
export class BadRequestChangeRoleResponse extends getBaseErrorBodyResponseSchema([
  {
    fields: "role",
    message: "Invalid option: expected one of \"USER\"|\"ADMIN\""
  }
]) {}

/** conflict response */
export class ConflictChangeRoleResponse extends getNormalErrorResponse(
  "The user already has the role USER",
  409
) {}