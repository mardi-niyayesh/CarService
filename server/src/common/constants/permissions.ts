const USER = {
  USER_SELF: "user.self",
  USER_VIEW: 'user.view',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
} as const;

export const PERMISSIONS = {
  ...USER,
} as const;

export type PermissionEnum = typeof PERMISSIONS[keyof typeof PERMISSIONS];