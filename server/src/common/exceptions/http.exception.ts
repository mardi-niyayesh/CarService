import type {Request, Response} from 'express';
import {Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus} from "@nestjs/common";

@Catch(HttpException)
export class ResponseException<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): T {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    const status: HttpStatus = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      success: false,
      
    };

    return exception;
  }
}