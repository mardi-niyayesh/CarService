import * as dotenv from "dotenv";

dotenv.config();

import "tsconfig-paths/register";
import {BaseRoles} from "@/types";
import {NestFactory} from "@nestjs/core";
import {CliModule} from "@/modules/cli/cli.module";
import {PrismaService} from "@/modules/prisma/prisma.service";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(CliModule);

  const prisma = app.get(PrismaService);

  const selfPermission = await prisma.permission.create({
    data: {
      name: "user.self",
      description: "Basic permission for users to view and update their own personal information"
    }
  });

  const selfRole = await prisma.role.create({
    data: {
      name: BaseRoles.self,
      description: "Basic role for users to view and update their own personal information",
    }
  });

  const ownerRole = await prisma.role.create({
    data: {
      name: BaseRoles.owner,
      description: "System owner with full access to all resources"
    }
  });

  if (!ownerRole || !selfPermission || !selfRole) {
    console.log("⚠ Something went wrong in Server!");
    await app.close();
    process.exit(1);
  }

  await prisma.rolePermission.create({
    data: {
      role_id: selfRole.id,
      permission_id: selfPermission.id,
    }
  });

  console.log("✅ Seed completed: Default roles [self, owner] have been created successfully.");

  await app.close();
  process.exit(0);
}

bootstrap()
  .then(() => console.log("running roles script"))
  .catch(e => console.error(e));