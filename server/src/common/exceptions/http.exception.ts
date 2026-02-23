import {getDefaultMessage} from "@/lib";
import type {Request, Response} from 'express';
import {BaseResponse, ZodException, BaseException} from "@/types";
import {Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus} from "@nestjs/common";

@Catch()
export class ResponseException implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    const status: HttpStatus = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = exception instanceof HttpException
      ? exception.getResponse()
      : null;

    const baseErrorResponse: BaseResponse = {
      statusCode: status,
      success: false,
      detail: getDefaultMessage(status),
      path: req.url,
      timestamp: new Date().toISOString(),
    };

    let finalResponse: ZodException | BaseException;

    if (body !== null && typeof body === 'object' && "errors" in body) {
      const exceptionZod = body as ZodException;

      finalResponse = {
        ...baseErrorResponse,
        message: exceptionZod.message,
        errors: exceptionZod.errors,
      } as ZodException;
    } else {
      const message: string = typeof body === 'string'
        ? body
        : (body as BaseException).message || "Internal Server Error";
      const error: string = (exception as BaseException).error || "Unknown Error";

      finalResponse = {
        ...baseErrorResponse,
        message,
        error,
      };
    }

    return res.status(status).json(finalResponse);
  }
}