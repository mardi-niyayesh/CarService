import {LoginUserSchemaType} from "@/types";
import {ApiProperty} from "@nestjs/swagger";
import {getBaseOkResponseSchema} from "@/common";
import {loginResponseSchema} from "./auth.login";

export class RefreshUsersOkResponse extends getBaseOkResponseSchema<LoginUserSchemaType>({
  path: "users/refresh",
  message: "accessToken successfully created.",
  data: loginResponseSchema,
  create: false,
}) {}

export class RefreshUsersUnAuthResponse {
  @ApiProperty({example: "Refresh token reuse detected"})
  message: string;

  @ApiProperty({example: "Unauthorized"})
  error: string;

  @ApiProperty({example: 401})
  statusCode: number;
}