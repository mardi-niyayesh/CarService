import {RefreshToken, User} from "@/modules/prisma/generated/client";

/** response user type */
export type CreateUserResponse = {
  user: Omit<User, "password"> & {
    password: undefined;
  };
}

/** AccessToken payload on JWT */
export interface AccessTokenPayload {
  sub: string;
  permissions: string[];
  display_name?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export type RefreshTokenPayload = RefreshToken & {
  user: SafeUser;
};

export type SafeUser = Omit<User, "password">;

export type LoginUserSchemaType = { user: SafeUser; accessToken: string; };