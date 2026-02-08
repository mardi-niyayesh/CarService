import {ApiResponse} from "../dto";
import {Observable, map} from 'rxjs';
import {BaseApiResponseType} from "../../lib";
import type {Response, Request} from "express";
import {Injectable, ExecutionContext, NestInterceptor, CallHandler} from '@nestjs/common';

@Injectable()
export class TransformInterceptors<T> implements NestInterceptor<BaseApiResponseType<T>, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<BaseApiResponseType<T>>): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map(response => {
        const statusCode: number = res.statusCode;

        return {
          success: statusCode >= 200 && statusCode <= 300,
          statusCode,
          detail: this.getDefaultMessage(statusCode),
          response,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      })
    );
  }

  private getDefaultMessage(statusCode: number): string {
    const defaultMessages: Record<number, string> = {
      200: 'Request Successful',
      201: 'Resource Created',
      204: 'Resource Deleted',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      500: 'Internal Server Error',
    };
    return defaultMessages[statusCode] || 'Unknown';
  }
}