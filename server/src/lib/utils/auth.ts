import {BaseRoles} from "@/types";

interface IsAllowedActionParams {
  roles: string[];
  requiredAll?: boolean;
  actionPermissions: string[];
  requiredPermissions: string[];
}

export function isAllowedAction(
  {
    actionPermissions,
    requiredPermissions,
    requiredAll = false,
    roles,
  }: IsAllowedActionParams
): boolean {
  roles.some(r => r === BaseRoles.owner.toString());

  if (requiredAll) return requiredPermissions.every(p => actionPermissions.includes(p));

  return requiredPermissions.some(p => actionPermissions.includes(p));
}