import {Reflector} from "@nestjs/core";
import type {UserAccess} from "@/types";
import {PUBLIC_METADATA} from "@/common";
import {AuthGuard} from "@nestjs/passport";
import {CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";

export class AccessTokenGuard extends AuthGuard("jwt-access") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic: boolean = this.reflector.get<boolean>(PUBLIC_METADATA, context.getHandler());

    if (isPublic) return true;

    return super.canActivate(context);
  }

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