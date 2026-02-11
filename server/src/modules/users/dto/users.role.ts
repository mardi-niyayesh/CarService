import z from 'zod';
import {createZodDto} from "nestjs-zod";
import {UserRole} from "@/modules/prisma/generated/enums";

export const ChangeRole = z.object({
  role: z.enum([UserRole.USER, UserRole.ADMIN] as const),
});

export type ChangeRoleInput = z.infer<typeof ChangeRole>;

export class ChangeRoleSchema extends createZodDto(ChangeRole) {}