import type {Lookup} from "geoip-lite";
import type {IResult} from "ua-parser-js";

export interface NormalizedClientInfo {
  ip: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  country: string | null;
  city: string | null;
  lang: string | null;
}

export function normalizeClientInfo(input: {
  ip: string | null;
  ua: IResult;
  geo: Lookup | null;
  lang: string | null;
}): NormalizedClientInfo {
  const {ip, ua, geo, lang} = input;

  return {
    ip,
    browser: ua.browser?.name ?? null,
    os: ua.os?.name ?? null,
    device: ua.device?.type ?? "desktop",
    country: geo?.country ?? null,
    city: geo?.city ?? null,
    lang,
  };
}