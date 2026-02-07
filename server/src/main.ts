import {AppModule} from './app.module';
import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";

/** run application */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /** global configs */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => console.log("nest successfully started."))
  .catch(e => console.error(e));