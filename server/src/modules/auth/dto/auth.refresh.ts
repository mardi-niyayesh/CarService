import {LoginUserSchemaType} from "@/types";
import {loginResponseSchema} from "./auth.login";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

export class RefreshUsersOkResponse extends getBaseOkResponseSchema<LoginUserSchemaType>({
  path: "users/refresh",
  create: false,
  response: {
    message: "accessToken successfully created.",
    data: loginResponseSchema,
  }
}) {}

export class RefreshUsersUnAuthResponse extends getNormalErrorResponse(
  "Refresh token missing",
  401
) {}