import {getDefaultMessage} from "@/lib";
import {ApiProperty} from "@nestjs/swagger";

/** normal example error  */
export function getNormalErrorResponse(message: string, statusCode: number) {
  const error: string = getDefaultMessage(statusCode);

  class UserNotFoundResponse {
    @ApiProperty({example: message})
    message: string;

    @ApiProperty({example: error})
    error: string;

    @ApiProperty({example: statusCode})
    statusCode: number;
  }

  return UserNotFoundResponse;
}

/** example response when user not authorized */
export class UnauthorizedResponse extends getNormalErrorResponse(
  "Access token missing or expired.",
  401
) {}

/** example response when too many requests from one ip in 1 minutes */
export class TooManyRequestResponse extends getNormalErrorResponse(
  "Too many requests. Try again 5 minutes later.",
  429
) {}

/** get schema for swagger when not allowed */
export class ForbiddenResponse extends getNormalErrorResponse(
  "Your role not access to this action.",
  403
) {}

/** get schema when request is ok */
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

/** params type for get schema for swagger when zod validate not success */
export interface ZodFieldError {
  fields: string;
  message: string;
}

/** get schema for swagger when zod validate not success */
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