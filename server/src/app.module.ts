import * as Modules from "./modules";
import {APP_GUARD} from "@nestjs/core";
import {ScheduleModule} from "@nestjs/schedule";
import {MiddlewareConsumer, Module} from '@nestjs/common';
import {ReateLimitMiddleware, AccessTokenGuard} from "./common";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    Modules.PrismaModule,
    Modules.AuthModule,
    Modules.UsersModule,
    Modules.SchedulerModule,
    Modules.CliModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ]
})
export class AppModule {
  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReateLimitMiddleware).forRoutes("*");
  }
}