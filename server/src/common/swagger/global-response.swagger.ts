import {getDefaultMessage} from "@/lib";
import {ApiProperty} from "@nestjs/swagger";
import {ApiResponse, BaseApiResponseData, ZodFieldError} from "@/types";

/** normal example error  */
export function getNormalErrorResponse(message: string, statusCode: number) {
  const error: string = getDefaultMessage(statusCode);

  class NormalErrorResponse {
    @ApiProperty({example: message})
    message: string;

    @ApiProperty({example: error})
    error: string;

    @ApiProperty({example: statusCode})
    statusCode: number;
  }

  return NormalErrorResponse;
}

/** example response when user not authorized */
export class UnauthorizedResponse extends getNormalErrorResponse(
  "Access token missing or expired.",
  401
) {}

/** example response when too many requests from one ip in 1 minutes */
export class TooManyRequestResponse {
  @ApiProperty({example: "Too many requests. Try again 5 minutes later."})
  message: string;

  @ApiProperty({example: 429})
  statusCode: number;
}

/** get schema for swagger when not allowed */
export class ForbiddenResponse extends getNormalErrorResponse(
  "Your role not access to this action.",
  403
) {}

/** get schema when request is ok */
export function getBaseOkResponseSchema<T>(props: { create?: boolean, response: ApiResponse<T>, path: string }) {
  const responseData = props.response as BaseApiResponseData<T>;

  const response = {
    message: props.response.message,
  };

  if ("data" in responseData) {
    (response as typeof responseData).data = responseData.data;
  }

  class BaseOkResponse {
    @ApiProperty({example: props.create ? 201 : 200})
    statusCode: number;

    @ApiProperty({example: true})
    success: boolean;

    @ApiProperty({example: props.create ? "Resource Created" : "Resource Successfully"})
    detail: string;

    @ApiProperty({example: props.path})
    path: string;

    @ApiProperty({example: "2026-02-08T02:11:20.630Z"})
    timestamp: string;

    @ApiProperty({
      example: response
    })
    response: {
      message: string;
      data?: T;
    };
  }

  return BaseOkResponse;
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
  {field: "id", error: "Invalid UUID"}
]) {}