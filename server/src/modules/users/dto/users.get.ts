import {getBaseOkResponseSchema} from "../../../common";
import {createUserResponse, CreateUserResponse} from "./users.create";

export class GetUserOkResponse extends getBaseOkResponseSchema<{
  user: CreateUserResponse
}>({
  path: createUserResponse.path,
  create: false,
  message: "User found successfully",
  data: createUserResponse.data as {
    user: CreateUserResponse
  }
}) {}