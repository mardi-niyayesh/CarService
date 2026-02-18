import * as dotenv from "dotenv";

dotenv.config();

import "tsconfig-paths/register";
import {BaseRoles} from "@/types";
import {PERMISSIONS} from "@/common";
import {NestFactory} from "@nestjs/core";
import {CliModule} from "@/modules/cli/cli.module";
import {INestApplicationContext} from "@nestjs/common";
import {PrismaService} from "@/modules/prisma/prisma.service";

/** create user manage role */
async function createUserManagerRole(app: INestApplicationContext, prisma: PrismaService): Promise<void> {
  const userManagerRole = await prisma.role.create({
    data: {
      name: BaseRoles.user_manager,
      description: "Full administrative access to manage all users in the system"
    }
  });

  if (!userManagerRole) {
    console.log("⚠ Something went wrong in Server! userManagerRole not created!");
    await app.close();
    process.exit(1);
  }

  const userManagerPermission = await prisma.permission.findMany({
    where: {
      AND: [
        {
          OR: [
            {name: {startsWith: PERMISSIONS.USER_VIEW.split(".")[0]}},
            {name: {startsWith: PERMISSIONS.ROLE_VIEW.split(".")[0]}},
          ]
        },
        {name: {not: PERMISSIONS.USER_SELF}}
      ]
    }
  });

  if (!userManagerPermission) {
    console.log("⚠ Something went wrong in Server! userManagerPermission not created");
    await app.close();
    process.exit(1);
  }

  for (const p of userManagerPermission) {
    await prisma.rolePermission.create({
      data: {
        role_id: userManagerRole.id,
        permission_id: p.id,
      }
    });
  }
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(CliModule);

  const prisma = app.get(PrismaService);

  const permissions = Object.entries(PERMISSIONS)
    .filter(p => p[1] !== "user.self")
    .map(p => p[1]);

  for (const p of permissions) {
    await prisma.permission.create({
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

  if (
    !ownerRole
    || !selfPermission
    || !selfRole
  ) {
    console.log("⚠ Something went wrong in Server! ownerRole or selfPermission or selfRole or userManagerRole not created");
    await app.close();
    process.exit(1);
  }

  await prisma.rolePermission.create({
    data: {
      role_id: selfRole.id,
      permission_id: selfPermission.id,
    }
  });

  await createUserManagerRole(app, prisma);

  console.log("✅ Seed completed: Default roles and permissions have been created successfully.");

  await app.close();
  process.exit(0);
}

bootstrap()
  .then(() => console.log("running roles script"))
  .catch(e => console.error(e));