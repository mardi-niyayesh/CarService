import path from "path";
import {readFileSync} from "fs";
import {getLocalDate} from "@/lib";
import {NormalizedClientInfo} from "@/types";

interface BuildEmailOptions {
  title: string;
  contentName: string;
  clientInfo: NormalizedClientInfo;
  siteName: string;
  siteUrl: string;
  extra?: Record<string, string>;
}

export function buildEmailHtml(options: BuildEmailOptions): string {
  const {
    title,
    contentName,
    clientInfo,
    extra = {},
    siteUrl = process.env.CLIENT_SITE!,
    siteName = "Car Service",
  } = options;

  const layoutPath: string = path.join(process.cwd(), "public/html/email.html");
  let html: string = readFileSync(layoutPath, "utf8");

  const contentPath: string = path.join(process.cwd(), `public/html/${contentName}.html`);
  let content: string = readFileSync(contentPath, "utf8");

  for (const key in extra) {
    content = content.replaceAll(`{{${key}}}`, extra[key]);
  }

  const clientMap: Record<string, string | null> = {
    ip: clientInfo.ip,
    browser: clientInfo.browser,
    os: clientInfo.os,
    device: clientInfo.device,
    country: clientInfo.country,
    city: clientInfo.city,
    lang: clientInfo.lang
  };

  for (const key in clientMap) {
    html = html.replace(`{{${key}}}`, clientMap[key] ?? "Unknown");
  }

  html = html.replace("{{miladiDate}}", getLocalDate("en-CA"));
  html = html.replace("{{shamsiDate}}", getLocalDate("fa-IR"));

  html = html.replace("{{siteName}}", siteName);
  html = html.replace("{{siteUrl}}", siteUrl);

  html = html.replace("{{title}}", title);

  html = html.replace("{{{content}}}", content);

  return html;
}