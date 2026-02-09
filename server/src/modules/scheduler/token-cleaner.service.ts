import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TokenCleanerService {
  constructor(private readonly prisma: PrismaService) {}

  async cleanExpiresToken() {

  }
}