import type {Request} from "express";
import {UserRole} from "../modules/prisma/generated/enums";

export interface AuthRequest extends Request {
  refreshTokenId: string;
  user: {
    id: string;
    role: UserRole
  }
}