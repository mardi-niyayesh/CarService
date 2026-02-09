import {loginResponseSchema} from "./users.login";
import {LoginUserSchemaType} from "../../../types";
import {getBaseOkResponseSchema} from "../../../common";

export class RefreshUsersOkResponse extends getBaseOkResponseSchema<LoginUserSchemaType>({
  path: "users/refresh",
  message: "accessToken successfully created.",
  data: loginResponseSchema,
  create: false,
}) {}