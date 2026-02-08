import {UsersModule} from "../users";
import {JwtModule} from "@nestjs/jwt";
import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {AuthController} from './auth.controller';
import {AccessStrategy} from "./strategy/access.strategy";
import {RefreshStrategy} from "./strategy/refresh.strategy";

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessStrategy, RefreshStrategy],
})
export class AuthModule {}