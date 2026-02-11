import {AccessRequest} from "@/types";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY, ROLE_METADATA} from "@/common";
import {UserRole} from "@/modules/prisma/generated/enums";
import {CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {isAllowedAction} from "@/lib";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AccessRequest>();

    const isPublic: boolean = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const requiredRole: UserRole = this.reflector.getAllAndOverride<UserRole>(ROLE_METADATA, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRole) throw new InternalServerErrorException({
      message: 'Missing Role, Role is Required',
      error: "Internal Server Error",
      statusCode: 500,
    });

    const isAllowed: boolean = isAllowedAction({
      actionRole: req.user.role,
      targetRole: requiredRole,
      roleComparison: "equal"
    });

    if (!isAllowed) throw new ForbiddenException({
      message: "Your role not access to this action.",
      error: "Forbidden",
      statusCode: 403,
    });

    return true;
  }
}