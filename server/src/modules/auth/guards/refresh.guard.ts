import {AuthRequest} from "../../../types";
import {hashSecretToken} from "../../../lib";
import {PrismaService} from "../../prisma/prisma.service";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();

    const cookies = req.cookies as { refreshToken?: string };

    const headerToken = req.headers["x-refresh-token"];

    const raw: string | null =
      cookies?.refreshToken
      || (Array.isArray(headerToken) ? headerToken[0] : headerToken)
      || null;

    if (!raw) throw new UnauthorizedException("Refresh token missing");

    const hashed: string = hashSecretToken(raw);

    const tokenRecord = await this.prisma.refreshToken.findFirst({
      where: {
        token: hashed,
        revokedAt: null,
        expiresAt: {gt: new Date()}
      },
      include: {
        user: {
          select: {
            id: true,
            role: true
          }
        }
      }
    });

    if (!tokenRecord) throw new UnauthorizedException("Invalid or expired refresh token");

    req.user = tokenRecord.user;
    req.refreshTokenId = tokenRecord.id;

    return true;
  }
}
