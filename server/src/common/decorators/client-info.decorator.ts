import type {Request} from "express";
import {normalizeClientInfo} from "@/lib";
import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const NormalizeClientInfo = createParamDecorator(
  (_data: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    return normalizeClientInfo(req.clientInfo);
  }
);