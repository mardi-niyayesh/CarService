import {HttpException, HttpStatus} from '@nestjs/common';

export class TooManyRequestsException extends HttpException {
  constructor(message = 'Too many requests. Try again later') {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}
