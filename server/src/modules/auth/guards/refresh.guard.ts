import {RefreshRequest} from "@/types";
import {compareSecretToken, hashSecretToken} from "@/lib";
import {PrismaService} from "@/modules/prisma/prisma.service";
import {RefreshToken} from "@/modules/prisma/generated/client";
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
      },
      include: {
        user: {
          omit: {
            password: true
          }
        }
      }
    });

    if (tokenRecord) {
      const allTokens = await this.prisma.refreshToken.findMany({
        where: {
          userId: tokenRecord.user.id
        }
      });

      let findTokenR: RefreshToken | null = null;

      for (const t of allTokens) {
        const valid: boolean = compareSecretToken(raw, t.token);
        if (valid) findTokenR = t;
      }

      if (findTokenR && findTokenR.revokedAt) {
        await this.prisma.refreshToken.updateMany({
          where: {
            userId: tokenRecord.user.id
          },
          data: {
            revokedAt: new Date(),
          }
        });

        throw new UnauthorizedException("Refresh token reuse detected");
      }
    }

    if (!tokenRecord) throw new UnauthorizedException("Invalid or expired refresh token");

    req.refreshPayload = tokenRecord;

    return true;
  }
}
