import z from 'zod';
import {createZodDto} from "nestjs-zod";

export const UserRoleAssigned = z.object({
  roleId: z.uuidv4(),
}).overwrite(data => ({
  roleId: data.roleId.trim(),
}));

export type UserRoleAssignedType = z.infer<typeof UserRoleAssigned>;

export class UserRoleAssignedDto extends createZodDto(UserRoleAssigned) {}