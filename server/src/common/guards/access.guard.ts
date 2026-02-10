import {Reflector} from "@nestjs/core";
import type {UserAccess} from "@/types";
import {PUBLIC_METADATA} from "@/common";
import {AuthGuard} from "@nestjs/passport";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class AccessTokenGuard extends AuthGuard("jwt-access") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic: boolean = this.reflector.getAllAndOverride(PUBLIC_METADATA, [
      context.getHandler(),
      context.getClass(),
    ]);

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