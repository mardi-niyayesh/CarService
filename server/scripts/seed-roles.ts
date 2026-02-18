import * as dotenv from "dotenv";

dotenv.config();

import "tsconfig-paths/register";
import {NestFactory} from "@nestjs/core";
import {CliModule} from "@/modules/cli/cli.module";
import {INestApplicationContext} from "@nestjs/common";
import {PrismaService} from "@/modules/prisma/prisma.service";
import {PERMISSIONS, ROLES, RolesType, PermissionsType} from "@/common";

interface SeedCreateRoleParams {
  app: INestApplicationContext;
  prisma: PrismaService;
  role: RolesType;
  permissions: PermissionsType;
  not?: PermissionsType
  description: string;
}

/** create roles */
async function createNewRole(data: SeedCreateRoleParams): Promise<void> {
  const {app, prisma, role, permissions, not, description} = data;

  if (role === ROLES.OWNER || role === ROLES.SELF) {
    console.log(`Cannot create a new role with name: ${role}`);
    await app.close();
    process.exit(1);
  }

  const newRole = await prisma.role.create({
    data: {
      name: role,
      description
    }
  });

  if (!newRole) {
    console.log(`⚠ Something went wrong in Server! ${role} not created!`);
    await app.close();
    process.exit(1);
  }

  const newRolePermissions = await prisma.permission.findMany({
    where: {
      AND: [
        {
          OR: [
            {name: {startsWith: permissions.split(".")[0]}},
          ]
        },
        {name: {not}}
      ]
    }
  });

  if (!newRolePermissions) {
    console.log(`⚠ Something went wrong in Server! permissions for ${role} not created`);
    await app.close();
    process.exit(1);
  }

  for (const p of newRolePermissions) {
    await prisma.rolePermission.create({
      data: {
        role_id: newRole.id,
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
      name: ROLES.SELF,
      description: "Basic role for users to view and update their own personal information",
    }
  });

  const ownerRole = await prisma.role.create({
    data: {
      name: ROLES.OWNER,
      description: "System owner with full access to all resources"
    }
  });

  if (!ownerRole || !selfPermission || !selfRole) {
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

  await createNewRole({
    app,
    prisma,
    role: ROLES.USER_MANAGER,
    permissions: PERMISSIONS.USER_VIEW,
    not: PERMISSIONS.USER_SELF,
    description: "Full administrative access to manage all users in the system",
  });

  await createNewRole({
    app,
    prisma,
    role: ROLES.ROLE_MANAGER,
    permissions: PERMISSIONS.ROLE_VIEW,
    description: "Full administrative access to manage all roles in the system",
  });

  console.log("✅ Seed completed: Default roles and permissions have been created successfully.");

  await app.close();
  process.exit(0);
}

bootstrap()
  .then(() => console.log("running roles script"))
  .catch(e => console.error(e));