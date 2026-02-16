import {Module} from '@nestjs/common';
import {TokenCleanerService} from "./token-cleaner.service";

@Module({
  providers: [TokenCleanerService],
})
export class SchedulerModule {}
