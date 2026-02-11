import {ApiProperty} from "@nestjs/swagger";

/** example response when user not authorized */
export class UnauthorizedResponse {
  @ApiProperty({example: "Access token missing or expired."})
  message: string;

  @ApiProperty({example: "Unauthorized"})
  error: string;

  @ApiProperty({example: 401})
  statusCode: number;
}

/** example response when too many requests from one ip in 1 minutes */
export class TooManyRequestResponse {
  @ApiProperty({example: "Too many requests. Try again 5 minutes later."})
  message: string;

  @ApiProperty({example: "Too Many Requests"})
  error: string;

  @ApiProperty({example: 429})
  statusCode: number;
}

export class ForbiddenResponse {
  @ApiProperty({example: "Your role not access to this action."})
  message: string;

  @ApiProperty({example: "Forbidden"})
  error: string;

  @ApiProperty({example: 403})
  statusCode: number;
}

export function getBaseOkResponseSchema<T>(props: { create?: boolean, message: string, data: T, path: string }) {
  class BaseOkResponse {
    @ApiProperty({example: true})
    success: boolean;

    @ApiProperty({example: props.create ? 201 : 200})
    statusCode: number;

    @ApiProperty({example: "Resource Created"})
    detail: string;

    @ApiProperty({
      example: {
        message: props.message,
        data: props.data,
      }
    })
    response: {
      message: string;
      data: T;
    };

    @ApiProperty({example: "2026-02-08T02:11:20.630Z"})
    timestamp: string;

    @ApiProperty({example: props.path})
    path: string;
  }

  return BaseOkResponse;
}

export interface ZodFieldError {
  fields: string;
  message: string;
}

export function getBaseErrorBodyResponseSchema(errors: ZodFieldError[]) {
  class BaseErrorResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({
      example: errors,
      isArray: true,
    })
    errors: ZodFieldError[];

    @ApiProperty({example: "Invalid request."})
    message: string;
  }

  return BaseErrorResponse;
}

export class BadRequestUUIDParams extends getBaseErrorBodyResponseSchema([
  {fields: "id", message: "Invalid UUID"}
]) {}

/** not found example for create user */
export function getNotFoundResponse(key: string) {
  class UserNotFoundResponse {
    @ApiProperty({example: `${key || ""} not found`})
    message: string;

    @ApiProperty({example: "Not Found"})
    error: string;

    @ApiProperty({example: 404})
    statusCode: number;
  }

  return UserNotFoundResponse;
}