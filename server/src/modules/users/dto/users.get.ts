import {CreateUserResponse} from "@/types";
import {getBaseOkResponseSchema} from "@/common";
import {createUserResponse} from "@/modules/auth/dto/auth.register";

/** ok example for get one user by id */
export class GetUserOkResponse extends getBaseOkResponseSchema<CreateUserResponse>({
  path: createUserResponse.path,
  create: false,
  message: "User found successfully",
  data: createUserResponse.data as CreateUserResponse
}) {}