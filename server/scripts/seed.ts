import * as dotenv from "dotenv";

dotenv.config();

import {CliModule} from "@/modules";
import "tsconfig-paths/register.js";
import {NestFactory} from "@nestjs/core";
import {PrismaService} from "@/modules/prisma/prisma.service";

await (async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(CliModule);

  const prisma = app.get(PrismaService);

  await prisma.role.createMany({
    data: [
      {
        name: "SELF",
        description: "Basic role for users to view and update their own personal information"
      },
      {
        name: "OWNER",
        description: "System owner with full access to all resources"
      }
    ]
  });

  console.log("✅ Seed completed: Default roles [SELF, OWNER] have been created successfully.");

  await app.close();
  process.exit(0);
})();