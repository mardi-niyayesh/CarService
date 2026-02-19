import 'dotenv/config';
import helmet from "helmet";
import path from "node:path";
import {AppModule} from './app.module';
import {NestFactory} from '@nestjs/core';
import cookieParser from "cookie-parser";
import {TransformInterceptors} from "./common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";

/** run application */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // base url
  app.setGlobalPrefix('api');

  app.useStaticAssets(path.join(process.cwd(), "public"), {
    prefix: '/static/',
  });

  /** global configs */
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformInterceptors());

  /** Swagger Version 1 */
  const swaggerConfigV1 = new DocumentBuilder()
    .setTitle("Car Service Api Document | server-side")
    .setDescription("Documentation of Car Service - server side(Back-end) | Zod + Nest.js + Swagger API + TypeScript")
    .setVersion("1.0.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }, "accessToken")
    .addCookieAuth("refreshToken", {
      type: "apiKey",
      in: "cookie",
      name: "refreshToken",
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfigV1);

  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
    customCssUrl: "/static/styles/swagger.css"
  });

  /** listen app on port */
  await app.listen(process.env.PORT ?? 3000);
}

/** bootstrap and run application */
bootstrap()
  .then(() => console.log(`nest successfully started on http://localhost:${process.env.PORT ?? 3000}/api/docs`))
  .catch(e => console.error(e));