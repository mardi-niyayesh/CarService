import {BaseRoles} from "@/types";

interface IsAllowedActionParams {
  role?: string;
  requiredAll?: boolean;
  actionPermissions: string[];
  requiredPermissions: string[];
}

export function isAllowedAction(
  {
    actionPermissions,
    requiredPermissions,
    requiredAll = false,
    role = "",
  }: IsAllowedActionParams
): boolean {
  if (role === BaseRoles.owner.toString()) return true;

  if (requiredAll) return requiredPermissions.every(p => actionPermissions.includes(p));

  return requiredPermissions.some(p => actionPermissions.includes(p));
}