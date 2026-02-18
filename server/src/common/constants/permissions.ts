const USER = {
  USER_SELF: "user.self",
  USER_VIEW: 'user.view',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
} as const;

const ROLE = {
  ROLE_ASSIGN: "role.assign",
  ROLE_CREATE: "role.create",
  ROLE_VIEW: 'role.view',
  ROLE_UPDATE: 'role.update',
  ROLE_DELETE: 'role.delete',
};

export const PERMISSIONS = {
  ...USER,
  ...ROLE,
} as const;

export type PermissionsType = typeof PERMISSIONS[keyof typeof PERMISSIONS];