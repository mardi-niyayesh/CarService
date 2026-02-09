import {Injectable, NestMiddleware} from '@nestjs/common';
import type {Response, Request, NextFunction} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.log("\n ", req.headers.authorization?.split("Bearer ")[1]);
    console.log("\n ", req.cookies.refreshToken);
    console.log("\n ", req.headers);
    return next();
  }
}