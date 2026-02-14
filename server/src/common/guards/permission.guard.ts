import {isAllowedAction} from "@/lib";
import {AccessRequest} from "@/types";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY, ROLES_METADATA} from "@/common";
import {CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException} from "@nestjs/common";

interface ReflectRoles {
  requireAll?: boolean;
  roles: string[];
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AccessRequest>();

    const isPublic: boolean = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const {requireAll, roles} = this.reflector.getAllAndOverride<ReflectRoles>(ROLES_METADATA, [
      context.getHandler(),
      context.getClass(),
    ]) || {requireAll: false, roles: []};

    if (!roles) throw new InternalServerErrorException({
      message: 'Missing Role, Role is Required',
      error: "Internal Server Error",
      statusCode: 500,
    });

    const actionPermissions = req.user.permissions;

    const isAllowed: boolean = isAllowedAction({
      requireAll,
      requiredPermissions: roles,
      actionPermissions
    });

    if (!isAllowed) throw new ForbiddenException({
      message: "Your role not access to this action.",
      error: "Forbidden",
      statusCode: 403,
    });

    return true;
  }
}