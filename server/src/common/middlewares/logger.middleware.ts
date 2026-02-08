import {Injectable, NestMiddleware} from '@nestjs/common';
import type {Response, Request, NextFunction} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);
    return next();
  }
}