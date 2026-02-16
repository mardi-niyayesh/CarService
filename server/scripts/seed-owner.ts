import * as dotenv from "dotenv";

dotenv.config();

import "tsconfig-paths/register";
import {hashSecret} from "@/lib";
import {BaseRoles} from "@/types";
import {NestFactory} from "@nestjs/core";
import {CreateUser} from "@/modules/auth/dto";
import {CliModule} from "@/modules/cli/cli.module";
import * as readline from "node:readline/promises";
import {PrismaService} from "@/modules/prisma/prisma.service";

async function ask<T extends keyof typeof CreateUser.shape>(
  q: string,
  field: T,
): Promise<string> {
  while (true) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer: string = await rl.question(q);

    const validate = CreateUser.shape[field].safeParse(answer);

    if (!validate.success) {
      console.log(`the ${field} not valid.`, validate.error.issues[0].message);
      continue;
    }

    return answer;
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CliModule);

  const prisma = app.get(PrismaService);

  const ownerRole = await prisma.role.findFirst({
    where: {
      name: BaseRoles.owner
    }
  });

  if (!ownerRole) {
    console.log("⚠ Owner role not exists in database");
    await app.close();
    process.exit(1);
  }

  const exist = await prisma.user.findFirst({
    where: {
      role_id: ownerRole.id
    }
  });

  if (exist) {
    console.log("Owner already exists");
    await app.close();
    return process.exit(0);
  }

  console.log(`creating owner...`);

  const email: string = await ask("enter email: ", "email");
  const password: string = await ask("enter password: ", "password");

  const hashedPassword: string = await hashSecret(password);

  const owner = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      display_name: "owner",
      role_id: ownerRole.id
    }
  });

  console.log(`✅ owner created:\nemail: ${owner.email}\nid: ${owner.id}\nrole: ${ownerRole.name}`);
  process.exit(0);
}

bootstrap()
  .then(() => console.log("running owner script"))
  .catch(e => console.error(e));