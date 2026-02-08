import {UsersModule} from "../users";
import {JwtModule} from "@nestjs/jwt";
import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {AuthController} from './auth.controller';
import {JwtStrategy} from "./strategy/jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get('JWT_EXPIRES'),
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}