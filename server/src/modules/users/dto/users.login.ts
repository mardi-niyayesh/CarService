import z from "zod";
import {date} from "../../../lib";
import {createZodDto} from "nestjs-zod";
import {ApiProperty} from "@nestjs/swagger";
import {LoginUserSchemaType} from "../../../types";
import {BaseUserSchema} from "./users.validators";
import {getBaseErrorBodyResponseSchema, getBaseOkResponseSchema} from "../../../common";

/** login users schema */
export const LoginUser = BaseUserSchema.pick({
  email: true,
  password: true,
}).extend({
  remember: z.boolean().optional().default(false),
});

/** login users schema type */
export type LoginUserInput = z.infer<typeof LoginUser>;

/** login users schema example */
export class LoginUserSchema extends createZodDto(LoginUser) {}

export const loginResponseSchema: LoginUserSchemaType = {
  user: {
    id: "7b0cfb3e-34fd-4607-bf49-2c99bd46698a",
    email: "john@example.com",
    role: "USER",
    display_name: "john",
    age: 20,
    createdAt: date,
    updatedAt: date,
  },
  accessToken: "accessToken",
};

export class LoginUserOkResponse extends getBaseOkResponseSchema<LoginUserSchemaType>({
  path: "users/login",
  message: "user logged in successfully",
  data: loginResponseSchema,
  create: false
}) {}

/** bad request example for login user */
export class LoginUserBadRequestResponse extends getBaseErrorBodyResponseSchema([
  {
    fields: "email",
    message: "Invalid email address"
  },
  {
    fields: "password",
    message: "Too small: expected string to have >=6 characters"
  },
  {
    fields: "password",
    message: "password must contain at least one letter and one number"
  },
  {
    fields: "remember",
    message: "Invalid input: expected boolean, received string"
  }
]) {}

export class LoginUserInvalidAuthResponse {
  @ApiProperty({example: "Invalid credentials"})
  message: string;

  @ApiProperty({example: "Unauthorized"})
  error: string;

  @ApiProperty({example: 401})
  statusCode: number;
}