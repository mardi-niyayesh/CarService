import {Injectable} from "@nestjs/common";
import type {AccessTokenPayload} from "@/types";
import {Strategy, ExtractJwt} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "jwt-access") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  validate(payload: AccessTokenPayload) {
    return {
      userId: payload.sub,
      role: payload.role,
      display_name: payload.display_name ?? "",
    };
  }
}