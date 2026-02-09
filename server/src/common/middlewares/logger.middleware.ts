import {Injectable, NestMiddleware} from '@nestjs/common';
import type {Request, Response, NextFunction} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    console.log(`user ip: ${req.ip}`);
    return next();
  }
}