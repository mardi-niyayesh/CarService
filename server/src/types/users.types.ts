import {RefreshToken, User} from "@/modules/prisma/generated/client";

export enum BaseRoles {
  owner = "owner",
  self = "self",
}

/** AccessToken payload on JWT */
export interface AccessTokenPayload {
  sub: string;
  permissions: string[];
  role: string;
  display_name?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export interface RefreshTokenPayload {
  refreshRecord: RefreshToken;
  user: SafeUser;
  permissions: string[];
  role: string;
}

export type SafeUser = Omit<User, "password">;

export type UserResponse = {
  user: Omit<SafeUser, "role_id"> & {
    role: string;
  };
}

export interface LoginResponse extends UserResponse {
  accessToken: string;
}

export type LoginUserSchemaType = { user: SafeUser; accessToken: string; };