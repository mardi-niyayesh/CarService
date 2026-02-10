import {hashSecretToken} from "@/lib";
import {RefreshRequest} from "@/types";
import {PrismaService} from "@/modules/prisma/prisma.service";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RefreshRequest>();

    const cookies = req.cookies as { refreshToken?: string };

    const headerToken = req.headers["x-refresh-token"];

    const raw: string | null =
      cookies?.refreshToken
      || (Array.isArray(headerToken) ? headerToken[0] : headerToken)
      || null;

    if (!raw) throw new UnauthorizedException("Refresh token missing");

    const hashed: string = hashSecretToken(raw);

    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: {
        token: hashed,
        revokedAt: null,
        expiresAt: {gt: new Date()}
      },
      include: {
        user: {
          omit: {
            password: true
          }
        }
      }
    });

    if (!tokenRecord) throw new UnauthorizedException("Invalid or expired refresh token");

    req.refreshPayload = tokenRecord;

    return true;
  }
}
