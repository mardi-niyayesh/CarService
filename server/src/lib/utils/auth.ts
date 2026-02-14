import {BaseRoles} from "@/types";

interface IsAllowedActionParams {
  role?: string;
  requireAll?: boolean;
  actionPermissions: string[];
  requiredPermissions: string[];
}

export function isAllowedAction(
  {
    actionPermissions,
    requiredPermissions,
    requireAll = false,
    role = "",
  }: IsAllowedActionParams
): boolean {
  if (role === BaseRoles.owner.toString()) return true;

  if (requireAll) return requiredPermissions.every(p => actionPermissions.includes(p));

  return requiredPermissions.some(p => actionPermissions.includes(p));
}