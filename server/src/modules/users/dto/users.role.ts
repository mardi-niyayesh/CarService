import z from 'zod';
import {createZodDto} from "nestjs-zod";
import {getBaseErrorBodyResponseSchema, getNormalErrorResponse} from "@/common";
import {UserRole} from "@/modules/prisma/generated/enums";
import {ApiProperty} from "@nestjs/swagger";

/** Change Role schema body */
export const ChangeRole = z.object({
  role: z.enum([UserRole.USER, UserRole.ADMIN] as const),
});

export type ChangeRoleInput = z.infer<typeof ChangeRole>;

/** change role swagger schema */
export class ChangeRoleSchema extends createZodDto(ChangeRole) {}

/** bad request response */
export class BadRequestChangeRoleResponse extends getBaseErrorBodyResponseSchema([
  {
    fields: "role",
    message: "Invalid option: expected one of \"USER\"|\"ADMIN\""
  }
]) {}

export class ConflictChangeRoleResponse extends getNormalErrorResponse(
  "The user already has the role USER",
  409
) {}