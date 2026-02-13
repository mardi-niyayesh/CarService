import {hashSecretToken} from '@/lib';
import {RefreshRequest} from '@/types';
import {PrismaService} from '@/modules/prisma/prisma.service';
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req: RefreshRequest = context.switchToHttp().getRequest<RefreshRequest>();

    const rawToken: string | null = this.getTokenFromReq(req);

    if (!rawToken) throw new UnauthorizedException('Refresh token missing');

    const hashed: string = hashSecretToken(rawToken);

    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: {token: hashed},
      include: {user: {omit: {password: true}}}
    });

    if (!tokenRecord) throw new UnauthorizedException('Invalid or expired refresh token');

    if (tokenRecord.revokedAt) throw new UnauthorizedException('Refresh token already revoked');

    req.refreshPayload = tokenRecord;
    return true;
  }

  private getTokenFromReq(req: RefreshRequest): string | null {
    const cookies = req.cookies as { refreshToken?: string };
    const header = req.headers['x-refresh-token'];

    return cookies?.refreshToken || (Array.isArray(header) ? header[0] : header) || null;
  }
}