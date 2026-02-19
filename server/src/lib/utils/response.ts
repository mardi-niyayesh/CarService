import {HttpStatus} from "@nestjs/common";

export function getDefaultMessage(status: HttpStatus): string {
  const defaultMessages: Partial<Record<HttpStatus, string>> = {
    [HttpStatus.OK]: 'Request Successful',
    [HttpStatus.CREATED]: 'Resource Created',
    [HttpStatus.NO_CONTENT]: 'Resource Deleted',
    [HttpStatus.BAD_REQUEST]: 'Bad Request',
    [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
    [HttpStatus.FORBIDDEN]: 'Forbidden',
    [HttpStatus.NOT_FOUND]: 'Not Found',
    [HttpStatus.CONFLICT]: 'Conflict',
    [HttpStatus.TOO_MANY_REQUESTS]: "Too Many Requests",
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  };
  return defaultMessages[status] || 'Unknown';
}