import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from './generated/client';
import {Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    private static initialize: boolean= false;

    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL as string,
        });
        super({
            adapter,
            errorFormat: 'minimal',
            log: ['info', 'error', 'warn'],
        });
    }

    async onModuleInit() {
        if (!PrismaService.initialize) {
            PrismaService.initialize = true;
            await this.$connect();
        }
    }

    async onModuleDestroy() {
        if (!PrismaService.initialize) {
            PrismaService.initialize = false;
            await this.$disconnect();
        }
    }
}