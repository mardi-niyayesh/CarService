import * as dotenv from "dotenv";

dotenv.config();

import "tsconfig-paths/register";
import {BaseRoles} from "@/types";
import {PERMISSIONS} from "@/common";
import {NestFactory} from "@nestjs/core";
import {CliModule} from "@/modules/cli/cli.module";
import {PrismaService} from "@/modules/prisma/prisma.service";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(CliModule);

  const prisma = app.get(PrismaService);

  const permissions = Object.entries(PERMISSIONS)
    .filter(p => p[1] !== "user.self")
    .map(p => p[1]);

  for (const p of permissions) {
    await prisma.permission.createMany({
      data: {
        name: p,
        description: `this permission allows ${p.split(".")[1]} on ${p.split(".")[0]}`,
      }
    });
  }

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

  const userManagerRole = await prisma.role.create({
    data: {
      name: BaseRoles.user_manager,
      description: "Full administrative access to manage all users and in the system"
    }
  });

  if (
    !ownerRole
    || !selfPermission
    || !selfRole
    || !userManagerRole
  ) {
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

  const userManagerPermission = await prisma.permission.findMany({
    where: {
      name: {
        startsWith: "users."
      }
    }
  });

  for (const p of userManagerPermission) {
    await prisma.rolePermission.create({
      data: {
        role_id: userManagerRole.id,
        permission_id: p.id,
      }
    });
  }

  console.log("✅ Seed completed: Default roles [self, owner] and other permissions have been created successfully.");

  await app.close();
  process.exit(0);
}

bootstrap()
  .then(() => console.log("running roles script"))
  .catch(e => console.error(e));