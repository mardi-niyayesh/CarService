import {User} from "../../modules/prisma/generated/client";

/** response user type */
export type CreateUserResponse = {
  user: Omit<User, "password"> & {
    password: undefined;
  };
}