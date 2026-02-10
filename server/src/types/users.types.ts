import {UserRole} from "@/modules/prisma/generated/enums";
import {RefreshToken, User} from "@/modules/prisma/generated/client";

/** response user type */
export type CreateUserResponse = {
  user: Omit<User, "password"> & {
    password: undefined;
  };
}

export const RolePriority = {
  [UserRole.SUPER_ADMIN]: 3,
  [UserRole.ADMIN]: 2,
  [UserRole.USER]: 1,
} as const;

/** AccessToken payload on JWT */
export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  display_name?: string;
}

export type RefreshTokenPayload = RefreshToken & {
  user: SafeUser;
};

export type SafeUser = Omit<User, "password">;

export type LoginUserSchemaType = { user: SafeUser; accessToken: string; };