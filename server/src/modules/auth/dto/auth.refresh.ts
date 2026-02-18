import {LoginUserSchemaType} from "@/types";
import {loginResponseSchema} from "./auth.login";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

/** 200 response */
export class RefreshUsersOkResponse extends getBaseOkResponseSchema<LoginUserSchemaType>({
  path: "auth/refresh",
  create: false,
  response: {
    message: "accessToken successfully created.",
    data: loginResponseSchema,
  }
}) {}

/** 401 response */
export class RefreshUsersUnAuthResponse extends getNormalErrorResponse(
  "Refresh token missing",
  401
) {}

/** 403 response */
export class RefreshForbiddenResponse extends getNormalErrorResponse("Refresh token already revoked", 403) {}