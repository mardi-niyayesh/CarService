import * as Modules from "./modules";
import {throttlerConfig} from "@/lib";
import {Module} from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {ScheduleModule} from "@nestjs/schedule";
import {AccessTokenGuard, RoleGuard} from "./common";
import {ThrottlerModule, ThrottlerGuard} from "@nestjs/throttler";

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerConfig),
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
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ]
})
export class AppModule {}