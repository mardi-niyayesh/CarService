import {Observable} from 'rxjs';
import type {Request} from "express";
import {PrismaService} from "../../prisma/prisma.service";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {compareSecretToken, hashSecretToken} from "../../../lib";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Promise<boolean> | Observable<boolean>> {
    const req = context.switchToHttp().getRequest<Request>();

    const cookies = req.cookies as { refreshToken?: string };

    const raw: string | string[] | null =
      cookies?.refreshToken
      || req.headers["x-refresh-token"]
      || null;

    if (!raw) throw new UnauthorizedException("Refresh token missing");

    const hashed: string = hashSecretToken(raw);

    return true;
  }
}
