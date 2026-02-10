import {Reflector} from "@nestjs/core";
import {AccessRequest, RolePriority} from "@/types";
import {UserRole} from "@/modules/prisma/generated/enums";
import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<AccessRequest>();

    const requiredRole: UserRole = this.reflector.get<UserRole>("role", context.getHandler());

    const userPriority = RolePriority[req.user.role];
    const requiredPriority = RolePriority[requiredRole];

    if (userPriority <= requiredPriority) throw new ForbiddenException({
      message: "Your role not access to this action.",
      error: "Forbidden",
      statusCode: 403,
    });

    return true;
  }
}