import type {Request, Response} from "express";
import {getDefaultMessage, getServerTime} from "@/lib";
import {BaseException, BaseExceptionRes, BaseResponse} from "@/types";
import {ArgumentsHost, ExceptionFilter, Catch, NotFoundException as NestNotFoundException, HttpException} from "@nestjs/common";

@Catch(NestNotFoundException)
export class NotFoundException implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<Request>();
    const res = host.switchToHttp().getResponse<Response>();

    const body = exception instanceof HttpException ? exception.getResponse() : null;

    const baseNotFoundResponse: BaseResponse = {
      statusCode: 404,
      success: false,
      detail: getDefaultMessage(404),
      path: req.url,
      timestamp: getServerTime(),
    };

    const formatBody = body as BaseException;

    if (formatBody.message.startsWith("Cannot")) {
      const finalRes: BaseExceptionRes = {
        ...baseNotFoundResponse,
        message: "Method or Route Not Found",
        error: "Not Found, route/method",
      };
      return res.status(404).json(finalRes);
    }

    throw exception;
  }
}