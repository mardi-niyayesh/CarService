import {Observable, map} from 'rxjs';
import {getDefaultMessage} from "@/lib";
import type {Response, Request} from "express";
import type {BaseApiResponse, BaseApiResponseData, InterceptorResponse} from "@/types";
import {Injectable, ExecutionContext, NestInterceptor, CallHandler} from '@nestjs/common';

@Injectable()
export class TransformInterceptors<T> implements NestInterceptor<BaseApiResponse | BaseApiResponseData<T>, InterceptorResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<BaseApiResponse | BaseApiResponseData<T>>
  ): Observable<InterceptorResponse<T>> | Promise<Observable<InterceptorResponse<T>>> {

    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map(response => {
        const statusCode: number = res.statusCode;

        return {
          success: statusCode >= 200 && statusCode <= 300,
          statusCode,
          detail: getDefaultMessage(statusCode),
          response,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      })
    );
  }
}