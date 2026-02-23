import {getDefaultMessage} from "@/lib";
import type {Request, Response} from 'express';
import {BaseResponse, ZodExceptionRes, BaseExceptionRes} from "@/types";
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

    let finalResponse: ZodExceptionRes | BaseExceptionRes;

    if (body !== null && typeof body === 'object' && "errors" in body) {
      const exceptionZod = body as ZodExceptionRes;

      finalResponse = {
        ...baseErrorResponse,
        message: exceptionZod.message,
        errors: exceptionZod.errors,
      } as ZodExceptionRes;
    } else {
      const message: string = typeof body === 'string'
        ? body
        : (body as BaseExceptionRes).message || "Internal Server Error";
      const error: string = (body as BaseExceptionRes).error || "Unknown Error";

      finalResponse = {
        ...baseErrorResponse,
        message,
        error,
      };
    }

    return res.status(status).json(finalResponse);
  }
}