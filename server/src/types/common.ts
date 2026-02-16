import type {Request} from "express";
import {RefreshTokenPayload, AccessTokenPayload} from "./users.types";

export interface RefreshRequest extends Request {
  refreshPayload: RefreshTokenPayload;
}

export type UserAccess = Omit<AccessTokenPayload, "sub"> & { userId: string };

export interface AccessRequest extends Request {
  user: UserAccess;
}