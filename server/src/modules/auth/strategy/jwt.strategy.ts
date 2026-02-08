import {Injectable} from "@nestjs/common";
import type {UserPayload} from "../../../lib";
import {Strategy, ExtractJwt} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET!
    });
  }

  validate(payload: UserPayload) {
    return {
      userID: payload.sub,
      display_name: payload.display_name,
      remember: payload.remember,
      role: payload.role,
    };
  }
}