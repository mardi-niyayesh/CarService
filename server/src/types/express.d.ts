import type {Lookup} from "geoip-lite";
import type {IResult} from "ua-parser-js";

declare global {
  namespace Express {
    interface Request {
      clientInfo: {
        ip: string | null;
        ua: IResult;
        geo: Lookup | null;
        lang: string | null;
      };
    }
  }
}