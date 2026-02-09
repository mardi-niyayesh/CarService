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
  display_name?: string;
}

/** RefreshToken payload on randomBytes */
export interface RefreshTokenPayload {
  id: string;
  role: UserRole
}