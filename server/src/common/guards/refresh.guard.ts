import {hashSecretToken} from '@/lib';
import {RefreshRequest, RefreshTokenPayload} from '@/types';
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
      include: {
        user: {
          omit: {password: true},
          include: {
            userRoles: {
              include: {
                role: {
                  include: {
                    rolePermissions: {
                      include: {permission: true}
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!tokenRecord) throw new UnauthorizedException('Invalid or expired refresh token');

    if (tokenRecord.revoked_at) {
      await this.prisma.refreshToken.updateMany({
        where: {user_id: tokenRecord.user.id},
        data: {revoked_at: new Date()}
      });

      throw new UnauthorizedException('Refresh token already revoked');
    }

    const roles: string[] = tokenRecord.user.userRoles.map(r => r.role.name);

    const rolePermissions = tokenRecord.user.userRoles.map(r => r.role.rolePermissions);

    const permissions = rolePermissions.map(rp => rp
      .map(p => p.permission.name)
    ).map(p => p[0]).filter(p => p !== undefined);

    req.refreshPayload = {
      refreshRecord: {
        id: tokenRecord.id,
        created_at: tokenRecord.created_at,
        updated_at: tokenRecord.updated_at,
        expires_at: tokenRecord.expires_at,
        revoked_at: tokenRecord.revoked_at,
        remember: tokenRecord.remember,
        user_id: tokenRecord.user_id,
        token: tokenRecord.token,
      },
      user: {
        id: tokenRecord.user.id,
        created_at: tokenRecord.user.created_at,
        updated_at: tokenRecord.user.updated_at,
        display_name: tokenRecord.user.display_name,
        email: tokenRecord.user.email,
        age: tokenRecord.user.age,
      },
      roles,
      permissions
    } as RefreshTokenPayload;

    return true;
  }

  private getTokenFromReq(req: RefreshRequest): string | null {
    const cookies = req.cookies as { refreshToken?: string };
    const header = req.headers['x-refresh-token'];

    return cookies?.refreshToken || (Array.isArray(header) ? header[0] : header) || null;
  }
}