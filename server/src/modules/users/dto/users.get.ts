import {CreateUserResponse} from "../../../lib";
import {createUserResponse} from "./users.create";
import {getBaseOkResponseSchema} from "../../../common";
import {ApiProperty} from "@nestjs/swagger";

/** ok example for get one user by id */
export class GetUserOkResponse extends getBaseOkResponseSchema<CreateUserResponse>({
  path: createUserResponse.path,
  create: false,
  message: "User found successfully",
  data: createUserResponse.data as CreateUserResponse
}) {}

/** not found example for create user */
export class GetUserNotFoundResponse {
  @ApiProperty({example: "User not found"})
  message: string;

  @ApiProperty({example: "Not Found"})
  error: string;

  @ApiProperty({example: 404})
  statusCode: number;
}