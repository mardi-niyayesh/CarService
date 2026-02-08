import z from "zod";
import {createZodDto} from "nestjs-zod";
import {ApiProperty} from "@nestjs/swagger";
import {BaseUserSchema} from "./users.validators";
import {date, type CreateUserResponse} from "../../../lib";
import {getBaseOkResponseSchema, getBaseErrorBodyResponseSchema} from "../../../common";

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
    message: "Invalid input: expected string, received undefined"
  },
  {
    fields: "password",
    message: "Invalid input: expected string, received undefined"
  }
]) {}