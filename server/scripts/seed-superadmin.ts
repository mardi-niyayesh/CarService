import * as dotenv from "dotenv";

dotenv.config();

import "tsconfig-paths/register";
import {hashSecret} from "@/lib";
import {NestFactory} from "@nestjs/core";
import * as readline from "node:readline";
import {CreateUser} from "@/modules/auth/dto";
import {CliModule} from "@/modules/cli/cli.module";
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

    const answer: string = await new Promise(resolve => {
      rl.question(q, answer => {
        rl.close();
        resolve(answer.trim());
      });
    });

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

  const exist = await prisma.user.findFirst({
    where: {

    }
  });

  if (exist) {
    console.log("Super admin already exists");
    await app.close();
    return process.exit(0);
  }

  console.log(`creating super admin...`);

  const email: string = await ask("enter email: ", "email");
  const password: string = await ask("enter password: ", "password");

  const hashedPassword: string = await hashSecret(password);

  // const superAdmin = await prisma.user.create({
  //   data: {
  //     email,
  //     password: hashedPassword,
  //     // role: "owner",
  //     display_name: "owner",
  //   }
  // });

  // console.log(`✅ Super admin created:\nemail: ${superAdmin.email}\nid: ${superAdmin.id}\nrole: ${superAdmin.role}`);
  // process.exit(0);
}

bootstrap()
  .then(() => console.log("running superadmin script"))
  .catch(e => console.error(e));