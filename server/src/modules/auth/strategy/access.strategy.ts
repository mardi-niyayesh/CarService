import {Strategy, ExtractJwt} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import type {AccessTokenPayload} from "../../../types";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "jwt-access") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    });
  }

  validate(payload: AccessTokenPayload) {
    if (payload.type !== "access") throw new UnauthorizedException("invalid access token");

    return {
      type: "access",
      userID: payload.sub,
      role: payload.role,
      display_name: payload.display_name ?? "",
    };
  }
}