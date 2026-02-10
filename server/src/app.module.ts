import * as Modules from "./modules";
import {ReateLimitMiddleware} from "./common";
import {ScheduleModule} from "@nestjs/schedule";
import {MiddlewareConsumer, Module} from '@nestjs/common';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    Modules.PrismaModule,
    Modules.AuthModule,
    Modules.UsersModule,
    Modules.SchedulerModule,
  ]
})
export class AppModule {
  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReateLimitMiddleware).forRoutes("*");
  }
}