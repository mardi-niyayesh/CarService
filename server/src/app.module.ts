import * as Modules from "./modules";
import {Module} from '@nestjs/common';

@Module({
  imports: [
    Modules.PrismaModule,
    Modules.UsersModule,
    Modules.AuthModule,
  ]
})
export class AppModule {}