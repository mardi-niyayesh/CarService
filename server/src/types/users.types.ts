import {User} from "../modules/prisma/generated/client";
import {UserRole} from "../modules/prisma/generated/enums";

/** response user type */
export type CreateUserResponse = {
  user: Omit<User, "password"> & {
    password: undefined;
  };
}

/** AccessToken payload on JWT */
export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  type: "access";
  display_name?: string;
}

/** RefreshToken payload on JWT */
export interface RefreshTokenPayload extends Omit<AccessTokenPayload, "type"> {
  jti: string;
  remember: boolean;
  type: "refresh";
}

interface BaseJwtPayloadParms {
  payload: AccessTokenPayload | RefreshTokenPayload;
}

interface TokenParamsRefresh extends BaseJwtPayloadParms {
  tokenType: "refresh";
  remember?: boolean;
}

interface TokenParamsAccess extends BaseJwtPayloadParms {
  tokenType: "access";
  remember?: never;
}

export type CreateTokenParams = TokenParamsRefresh | TokenParamsAccess;