import {Injectable} from "@nestjs/common";
import {Strategy, ExtractJwt} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import type {AccessTokenPayload} from "../../../types";

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
      userID: payload.sub,
      role: payload.role,
      display_name: payload.display_name ?? "",
    };
  }
}