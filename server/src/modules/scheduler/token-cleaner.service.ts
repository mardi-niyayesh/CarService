import {Cron} from "@nestjs/schedule";
import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TokenCleanerService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron("/*5 * * * *") // five minutes
  async cleanExpiresToken(): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: {
        expiresAt: {lt: new Date()},
        revokedAt: null
      },
      data: {
        revokedAt: new Date(),
      }
    });
  }
}