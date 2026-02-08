import {UsersService} from './users.service';
import {LoggerMiddleware} from "../../common";
import {UsersController} from './users.controller';
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {path: "users", method: RequestMethod.POST},
    );
  }
}