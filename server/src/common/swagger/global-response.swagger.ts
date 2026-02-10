import {ApiProperty} from "@nestjs/swagger";

/** example response when user not authorized */
export class UnauthorizedResponse {
  @ApiProperty({example: "Unauthorized"})
  message: string;

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