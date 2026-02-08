import type {Request} from "express";
import {Strategy, ExtractJwt} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import type {RefreshTokenPayload} from "../../../types";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.refreshToken ?? null;
        },
        ExtractJwt.fromHeader("x-refresh-token"),
        ExtractJwt.fromUrlQueryParameter("refresh_token"),
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
    });
  }

  validate(request: Request, payload: RefreshTokenPayload) {
    if (payload.type !== "refresh") throw new UnauthorizedException("invalid refresh token");

    const refreshToken = request.cookies?.refreshToken || request.headers['x-refresh-token'];

    return {
      type: "refresh",
      userID: payload.sub,
      role: payload.role,
      remember: payload.remember ?? false,
      refreshToken,
      display_name: payload.display_name ?? "",
    };
  }
}