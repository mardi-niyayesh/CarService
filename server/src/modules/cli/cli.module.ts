import {Module} from '@nestjs/common';
import {PrismaService} from "@/modules/prisma/prisma.service";

@Module({
  imports: [PrismaService]
})
export class CliModule {}
