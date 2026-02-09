import type {Request} from "express";
import {RefreshTokenPayload} from "./users.types";
import type {RefreshToken} from "../modules/prisma/generated/client";

export interface AuthRequest extends Request {
  refreshToken: RefreshToken;
  user: RefreshTokenPayload;
}