import {NormalizedClientInfo} from "@/types";

export function normalizeClientInfo(input: Express.Request["clientInfo"]): NormalizedClientInfo {
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