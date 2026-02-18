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
  const isOwner: boolean = roles.some(r => r === BaseRoles.owner.toString());

  if (isOwner) return true;

  const permissionSet = new Set(actionPermissions);

  if (requiredAll) return requiredPermissions.every(p => permissionSet.has(p));

  return requiredPermissions.some(p => permissionSet.has(p));
}