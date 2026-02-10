import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {PrismaService} from "../prisma/prisma.service";

/** revoked all tokens when expiresAt <= now */
@Injectable()
export class TokenCleanerService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_5_MINUTES) // five minutes
  async cleanExpiresToken(): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {lt: new Date()},
      }
    });
  }
}