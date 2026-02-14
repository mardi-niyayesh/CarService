import z from "zod";
import {date} from "@/lib";
import {createZodDto} from "nestjs-zod";
import type {CreateUserResponse} from "@/types";
import {BaseUserSchema} from "@/modules/users/dto/users.validators";
import {getBaseOkResponseSchema, getBaseErrorBodyResponseSchema, getNormalErrorResponse} from "@/common";

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
      role_id: "7b0cfb3e-34fd-4607-bf49-2c99bd46698f",
      display_name: "John",
      age: 24,
      password: undefined,
      created_at: date,
      updated_at: date
    }
  }
};

/** ok example for create user */
export class CreateUserOkResponse extends getBaseOkResponseSchema<CreateUserResponse>({
  path: createUserResponse.path,
  create: createUserResponse.create,
  response: {
    message: createUserResponse.message,
    data: createUserResponse.data as CreateUserResponse
  }
}) {}

/** conflict example for create user */
export class CreateUserConflictResponse extends getNormalErrorResponse(
  "User already exists",
  409
) {}

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