import {CreateUserResponse} from "../../../lib";
import {createUserResponse} from "./users.create";
import {getBaseOkResponseSchema} from "../../../common";

/** ok example for get one user by id */
export class GetUserOkResponse extends getBaseOkResponseSchema<CreateUserResponse>({
  path: createUserResponse.path,
  create: false,
  message: "User found successfully",
  data: createUserResponse.data as CreateUserResponse
}) {}