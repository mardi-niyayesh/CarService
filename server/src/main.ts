import 'dotenv/config';
import {AppModule} from './app.module';
import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {TransformInterceptors} from "./common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

/** run application */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /** global configs */
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptors());

  /** Swagger Version 1 */
  const swaggerConfigV1 = new DocumentBuilder()
    .setTitle("Document")
    .setDescription("Documentation of Car Service")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfigV1);
  SwaggerModule.setup("api/docs", app, document);

  console.log(process.env.PORT);

  /** listen app on port */
  await app.listen(process.env.PORT ?? 3000);
}

/** bootstrap and run application */
bootstrap()
  .then(() => console.log("nest successfully started."))
  .catch(e => console.error(e));