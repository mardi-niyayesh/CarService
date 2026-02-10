import {AuthGuard} from "@nestjs/passport";
import {RolePriority, UserAccess} from "@/types";
import {UserRole} from "@/modules/prisma/generated/enums";
import {ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class RoleGuard extends AuthGuard("jwt-access") {
  // noinspection JSUnusedGlobalSymbols
  handleRequest<T extends UserAccess>(err: Error, user: T, _info: unknown, _context: ExecutionContext, _status?: unknown) {
    if (err || !user) throw new UnauthorizedException({
      message: "Access token missing or expired",
      error: "Unauthorized",
      statusCode: 401,
    });

    console.log("in Role Guard: ", user);

    if (RolePriority[user.role] < RolePriority[UserRole.ADMIN]) throw new ForbiddenException({
      message: "Role not",
      error: "Forbidden",
      statusCode: 403,
    });

    return user;
  }
}