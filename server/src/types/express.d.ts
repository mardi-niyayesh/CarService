/// <reference types="express" />
declare namespace Express {
  export interface Request {
    cookies: {
      refreshToken?: string;
      remember?: boolean;
    };
  }
}