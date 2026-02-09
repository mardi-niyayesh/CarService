import type {Request} from "express";
import {RefreshTokenPayload} from "./users.types";

export interface AuthRequest extends Request {
  refreshTokenId: string;
  user: RefreshTokenPayload;
}