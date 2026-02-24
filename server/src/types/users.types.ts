import {RefreshToken, User} from "@/modules/prisma/generated/client";

interface BaseTokens {
  roles: string[];
  permissions: string[];
}

/** AccessToken payload on JWT */
export interface AccessTokenPayload extends BaseTokens {
  sub: string;
  display_name?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export interface RefreshTokenPayload extends BaseTokens {
  refreshRecord: RefreshToken;
  user: SafeUser;
}

export type SafeUser = Omit<User, "password">;

export type UserResponse = {
  user: SafeUser & BaseTokens;
}

export interface LoginResponse extends UserResponse {
  accessToken: string;
}

export type LoginUserSchemaType = { user: SafeUser & BaseTokens; accessToken: string; };