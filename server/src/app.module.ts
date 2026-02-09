import * as Modules from "./modules";
import {Module} from '@nestjs/common';

@Module({
  imports: [
    Modules.PrismaModule,
    Modules.AuthModule,
    Modules.UsersModule,
    Modules.SchedulerModule,
  ]
})
export class AppModule {}