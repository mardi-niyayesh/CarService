import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "@/common";
import {AuthGuard} from "@nestjs/passport";
import type {BaseException, UserAccess} from "@/types";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class AccessTokenGuard extends AuthGuard("jwt-access") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic: boolean = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  // noinspection JSUnusedGlobalSymbols
  handleRequest<T = UserAccess>(err: Error, user: T, _info: unknown, _context: ExecutionContext, _status?: unknown) {
    if (err || !user) throw new UnauthorizedException({
      message: "Access token missing or expired",
      error: "accessToken Expires",
    } as BaseException);
    return user;
  }
}