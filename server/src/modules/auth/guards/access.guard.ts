import type {UserAccess} from "@/types";
import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, UnauthorizedException} from "@nestjs/common";

export class AccessTokenGuard extends AuthGuard("jwt-access") {
  // noinspection JSUnusedGlobalSymbols
  handleRequest<T extends UserAccess>(err: Error, user: T, _info: unknown, _context: ExecutionContext, _status?: unknown) {
    if (err || !user) throw new UnauthorizedException({
      message: "Access token missing or expired",
      error: "Unauthorized",
      statusCode: 401,
    });
    return user;
  }
}