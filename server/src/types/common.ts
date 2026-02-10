import type {Request} from "express";
import {RefreshTokenPayload, AccessTokenPayload} from "./users.types";

export interface RefreshRequest extends Request {
  refreshPayload: RefreshTokenPayload;
}

export interface AccessRequest extends Request {
  user: AccessTokenPayload;
}