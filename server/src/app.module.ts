import * as Modules from "./modules";
import {APP_GUARD} from "@nestjs/core";
import {ScheduleModule} from "@nestjs/schedule";
import {MiddlewareConsumer, Module} from '@nestjs/common';
import {ReateLimitMiddleware, AccessTokenGuard} from "./common";
import {ThrottlerModule, ThrottlerGuard} from "@nestjs/throttler";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 60_000,
        limit: 10
      }]
    }),
    Modules.PrismaModule,
    Modules.AuthModule,
    Modules.UsersModule,
    Modules.SchedulerModule,
    Modules.CliModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
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