import z from "zod";
import {createZodDto} from "nestjs-zod";
import {BaseUserSchema} from "./users.validators";
import {getBaseErrorBodyResponseSchema} from "../../../common";
import {ApiProperty} from "@nestjs/swagger";

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