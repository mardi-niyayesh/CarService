import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {AuthController} from './auth.controller';
import {JwtStrategy} from "./strategy/jwt.strategy";
import {UsersService} from "../users/users.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [UsersService, PassportModule, JwtModule.registerAsync({
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