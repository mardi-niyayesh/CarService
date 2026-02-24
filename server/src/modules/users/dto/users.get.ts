import {UserResponse} from "@/types";
import {createUserResponse} from "@/modules/auth/dto/auth.register";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

/** ok example for get one user by id */
export class GetUserOkResponse extends getBaseOkResponseSchema<UserResponse>({
  path: "users/d228cc19-b8c9-41c4-8c70-c2c6effb05ca",
  create: false,
  response: {
    message: "User found successfully",
    data: createUserResponse.data
  }
}) {}

/** ok example for get one user by id */
export class GetMeOkResponse extends getBaseOkResponseSchema<UserResponse>({
  path: "users",
  create: false,
  response: {
    message: "User found successfully",
    data: createUserResponse.data
  }
}) {}

export class NotFoundGetUserResponse extends getNormalErrorResponse({
  path: "/users/:id",
  message: "User not found in database",
  error: "User Not Found",
  statusCode: 404
}) {}