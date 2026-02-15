import {isAllowedAction} from "@/lib";
import {AccessRequest} from "@/types";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY, PERMISSION_METADATA, type PermissionDecoratorParams} from "@/common";
import {CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException} from "@nestjs/common";

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

    const {requiredAll, permissions: requiredPermissions} = this.reflector.getAllAndOverride<PermissionDecoratorParams>(PERMISSION_METADATA, [
      context.getHandler(),
      context.getClass(),
    ]) || {requiredAll: false, permissions: []};

    console.log(requiredAll, requiredPermissions);

    if (!requiredPermissions) throw new InternalServerErrorException({
      message: 'Missing Role, Role is Required',
      error: "Internal Server Error",
      statusCode: 500,
    });

    const actionPermissions: string[] = req.user.permissions;

    const isAllowed: boolean = isAllowedAction({
      requiredAll,
      requiredPermissions,
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