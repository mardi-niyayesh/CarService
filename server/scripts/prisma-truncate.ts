import * as dotenv from "dotenv";

dotenv.config();

import "tsconfig-paths/register";
import {NestFactory} from "@nestjs/core";
import {CliModule} from "@/modules/cli/cli.module";
import {INestApplicationContext} from "@nestjs/common";
import {PrismaService} from "@/modules/prisma/prisma.service";

async function bootstrap(): Promise<void> {
  const app: INestApplicationContext = await NestFactory.createApplicationContext(CliModule);

  const prisma: PrismaService = app.get(PrismaService);

  console.log("connect to prisma and Running TRUNCATE script");

  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "users", "user_roles", "roles", "permissions", "role_permission", "refresh_tokens" RESTART IDENTITY CASCADE;`
  );

  console.log("Finish and TRUNCATE Successfully.");
  await app.close();
  process.exit();
}

bootstrap()
  .then(() => console.log("running roles script"))
  .catch(e => console.error(e));