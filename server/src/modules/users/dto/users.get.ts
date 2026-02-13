import {CreateUserResponse} from "@/types";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";
import {createUserResponse} from "@/modules/auth/dto/auth.register";

/** ok example for get one user by id */
export class GetUserOkResponse extends getBaseOkResponseSchema<CreateUserResponse>({
  path: createUserResponse.path,
  create: false,
  response: {
    message: "User found successfully",
    data: createUserResponse.data as CreateUserResponse
  }
}) {}

export class NotFoundGetUserResponse extends getNormalErrorResponse(
  "User not found",
  404
) {}