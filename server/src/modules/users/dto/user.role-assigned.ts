import z from 'zod';

export const UserRoleAssigned = z.object({
  role: z.string(),
}).overwrite(data => ({
  role: data.role.trim(),
}));

export type UserRoleAssignedType = z.infer<typeof UserRoleAssigned>;