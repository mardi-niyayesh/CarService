import {UserResponse} from "@/types";
import {createUserResponse} from "@/modules/auth/dto/auth.register";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

/** ok example for get one user by id */
export class GetUserOkResponse extends getBaseOkResponseSchema<UserResponse>({
  path: createUserResponse.path,
  create: false,
  response: {
    message: "User found successfully",
    data: createUserResponse.data
  }
}) {}

export class NotFoundGetUserResponse extends getNormalErrorResponse(
  "User not found",
  404
) {}