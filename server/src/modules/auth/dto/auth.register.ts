import z from "zod";
import {date} from "@/lib";
import {createZodDto} from "nestjs-zod";
import {ApiProperty} from "@nestjs/swagger";
import type {CreateUserResponse} from "@/types";
import {BaseUserSchema} from "@/modules/users/dto/users.validators";
import {getBaseOkResponseSchema, getBaseErrorBodyResponseSchema} from "@/common";

/** create user schema */
export const CreateUser = BaseUserSchema.overwrite(data => ({
  ...data,
  display_name: data.display_name?.trim()
}));

/** Create User Type */
export type CreateUserInput = z.infer<typeof BaseUserSchema>;

/** Create User DTO for Swagger */
export class CreateUserSchema extends createZodDto(BaseUserSchema) {}

/** object for ok response */
export const createUserResponse = {
  path: "users",
  message: "user created successfully",
  create: true,
  data: {
    user: {
      id: "d228cc19-b8c9-41c4-8c70-c2c6effb05ca",
      email: "john@example.com",
      role: "USER",
      display_name: "John",
      age: 24,
      password: undefined,
      createdAt: date,
      updatedAt: date
    }
  }
};

/** ok example for create user */
export class CreateUserOkResponse extends getBaseOkResponseSchema<CreateUserResponse>({
  path: createUserResponse.path,
  create: createUserResponse.create,
  message: createUserResponse.message,
  data: createUserResponse.data as CreateUserResponse
}) {}

/** conflict example for create user */
export class CreateUserConflictResponse {
  @ApiProperty({example: "User already exists"})
  message: string;

  @ApiProperty({example: "Conflict"})
  error: string;

  @ApiProperty({example: 409})
  statusCode: number;
}

/** bad request example for create user */
export class CreateUserBadRequestResponse extends getBaseErrorBodyResponseSchema([
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
    fields: "display_name",
    message: "Too small: expected string to have >=3 characters"
  },
  {
    fields: "age",
    message: "Too big: expected number to be <=120"
  }
]) {}