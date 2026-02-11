import {ApiResponse} from "../dto";
import {Observable, map} from 'rxjs';
import {getDefaultMessage} from "@/lib";
import {BaseApiResponseType} from "@/types";
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
          detail: getDefaultMessage(statusCode),
          response,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      })
    );
  }
}