import {LoginUserSchemaType} from "@/types";
import {loginResponseSchema} from "./auth.login";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

export class RefreshUsersOkResponse extends getBaseOkResponseSchema<LoginUserSchemaType>({
  path: "users/refresh",
  message: "accessToken successfully created.",
  data: loginResponseSchema,
  create: false,
}) {}

export class RefreshUsersUnAuthResponse extends getNormalErrorResponse(
  "Refresh token missing",
  401
) {}