interface IsAllowedActionParams {
  actionPermissions: string[];
  requiredPermissions: string[];
  requireAll?: boolean;
}

export function isAllowedAction(
  {
    actionPermissions,
    requiredPermissions,
    requireAll = false,
  }: IsAllowedActionParams
): boolean {
  if (requireAll) return requiredPermissions.every(p => actionPermissions.includes(p));

  return requiredPermissions.some(p => actionPermissions.includes(p));
}