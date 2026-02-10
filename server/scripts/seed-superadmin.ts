import "ts-node/register";
import {hashSecret} from "@/lib";
import {AppModule} from "@/app.module";
import {NestFactory} from "@nestjs/core";
import * as readline from "node:readline";
import {CreateUser} from "@/modules/auth/dto";
import {UserRole} from "@/modules/prisma/generated/enums";
import {PrismaService} from "@/modules/prisma/prisma.service";

function ask<T extends keyof typeof CreateUser.shape>(
  question: string,
  field: T,
): Promise<unknown> {
  while (true) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = new Promise(resolve => {
      rl.question(question, answer => {
        rl.close();
        resolve(answer.trim());
      });
    });

    // const input = await answer;

    const validate = CreateUser.shape[field].safeParse(answer);

    if (!validate.success) {
      console.log(`the ${field} not valid.`, validate.error.issues[0].message);
      continue;
    }

    return answer;
  }
}

async function bootstrap(): Promise<never> {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);

  const exist = await prismaService.user.findFirst({
    where: {
      role: UserRole.SUPER_ADMIN,
    }
  });

  if (exist) {
    console.log("Super admin already exists");
    await app.close();
    return process.exit(0);
  }

  console.log(`creating super admin...`);

  const email = await ask("enter email: ", "email") as string;
  const password = await ask("enter password: ", "password") as string;

  const hashedPassword: string = await hashSecret(password);

  const superAdmin = await prismaService.user.create({
    data: {
      email,
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      display_name: UserRole.SUPER_ADMIN,
    }
  });

  console.log(`✅ Super admin created:\nemail: ${superAdmin.email}\nid: ${superAdmin.id}\nrole: ${superAdmin.role}`);
  process.exit(0);
}

bootstrap()
  .then(() => console.log("running superadmin script"))
  .catch(e => console.error(e));