import z from "zod";
import {ApiProperty} from "@nestjs/swagger";
import {BaseApiResponseType} from "../../lib";

export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  detail: string;
  response: BaseApiResponseType<T>;
  timestamp: string;
  path?: string;
}

export function getBaseOkResponseSchema<T>(props: { create: boolean, message: string, data: T, path: string }) {
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

export function getBaseErrorResponseSchema(props: {
  statusCode: number;
  message: string;
  errors: ZodFieldError[];
}) {
  class BaseErrorResponse {
    @ApiProperty({example: props.statusCode})
    statusCode: number;

    @ApiProperty({
      example: props.errors,
      isArray: true,
    })
    errors: ZodFieldError[];

    @ApiProperty({example: props.message})
    message: string;
  }

  return BaseErrorResponse;
}

export const UUID4Schema = z.object({
  id: z.uuidv4()
});

export type UUID4Type = z.infer<typeof UUID4Schema>;

export const UUID4Dto = {
  name: "id",
  type: String,
  description: "UUID",
  example: "d228cc19-b8c9-41c4-8c70-c2c6effb05ca"
};