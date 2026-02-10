import * as Modules from "./modules";
import {APP_GUARD} from "@nestjs/core";
import {ReateLimitMiddleware} from "./common";
import {ScheduleModule} from "@nestjs/schedule";
import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AccessTokenGuard} from "@/common/guards/access.guard";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    Modules.PrismaModule,
    Modules.AuthModule,
    Modules.UsersModule,
    Modules.SchedulerModule,
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