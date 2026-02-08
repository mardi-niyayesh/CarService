import {Injectable} from "@nestjs/common";
import type {UserPayload} from "../../../lib";
import {Strategy, ExtractJwt} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy) {
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
      role: payload.role,
      remember: payload.remember ?? false,
      display_name: payload.display_name ?? "",
    };
  }
}