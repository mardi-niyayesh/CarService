import {User} from "../../modules/prisma/generated/client";
import {UserRole} from "../../modules/prisma/generated/enums";

/** response user type */
export type CreateUserResponse = {
  user: Omit<User, "password"> & {
    password: undefined;
  };
}

/** User payload on JWT */
export interface UserPayload {
  sub: string;
  display_name: string;
  remember: boolean;
  role: UserRole;
}