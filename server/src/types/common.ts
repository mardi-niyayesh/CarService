import type {Request} from "express";
import {RefreshTokenPayload} from "./users.types";

export interface RefreshRequest extends Request {
  refreshPayload: RefreshTokenPayload;
}