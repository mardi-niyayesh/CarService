/// <reference types="express" />
import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    cookies: {
      refreshToken?: string;
      remember?: boolean;
    };
  }
}