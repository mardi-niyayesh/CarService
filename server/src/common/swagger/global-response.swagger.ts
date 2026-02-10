import {ApiProperty} from "@nestjs/swagger";

export class UnauthorizedResponse {
  @ApiProperty({example: "Unauthorized"})
  message: string;

  @ApiProperty({example: 401})
  statusCode: number;
}