export const ROLES = {
  owner: "owner",
  self: "self",
  user_manager: "user_manager",
  role_manager: "role_manager",
} as const;

export type Roles = typeof ROLES[keyof typeof ROLES];