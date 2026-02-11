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

/** not found example for create user */
export function getUserNotFoundResponse(key: string) {
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