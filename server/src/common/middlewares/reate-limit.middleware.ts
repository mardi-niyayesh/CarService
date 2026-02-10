import {TooManyRequestsException} from "@/common";
import {Injectable, NestMiddleware} from '@nestjs/common';
import type {Request, Response, NextFunction} from 'express';

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUEST = 10;
const BLOCK_TIMEOUT_MS = 5 * WINDOW_MS; // 5 minute

/** ip lists */
const requestMap = new Map<string, {
  isBlocked: boolean;
  blockUntil: number | null;
  timestamps: number[];
}>();

@Injectable()
export class ReateLimitMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] as string || req.ip as string;
    const now = Date.now();

    // if ap list is undefined, set an empty record
    if (!requestMap.has(ip)) {
      requestMap.set(ip, {
        isBlocked: false,
        blockUntil: null,
        timestamps: [],
      });
    }

    const record = requestMap.get(ip)!;

    // if ip is blocked
    if (record.isBlocked) {
      if (now < record.blockUntil!) {
        throw new TooManyRequestsException(`Too many requests. Try again ${BLOCK_TIMEOUT_MS / 60000} minutes later.`);
      }

      // else clear logs
      record.isBlocked = false;
      record.blockUntil = null;
      record.timestamps = [];
    }

    const filtered = record.timestamps.filter(t => now - t < WINDOW_MS);

    // if ip reached limits, blocked.
    if (filtered.length >= MAX_REQUEST) {
      record.isBlocked = true;
      record.blockUntil = Date.now() + BLOCK_TIMEOUT_MS;
      record.timestamps = [];

      throw new TooManyRequestsException(`Too many requests. Try again ${BLOCK_TIMEOUT_MS / 60000} minutes later.`);
    }

    filtered.push(now);

    record.timestamps = filtered;
    return next();
  }
}

/** clear requestMap every 6 minute */
setInterval(() => {
  const now = Date.now();

  for (const [ip, info] of requestMap.entries()) {
    // if ip is blocked, don`t clear
    if (info.isBlocked) continue;

    // get all ip list where timestamp letter than WINDOW_MS
    const filtered = info.timestamps.filter(ts => now - ts < WINDOW_MS);

    if (filtered.length === 0) {
      requestMap.delete(ip);
    } else {
      requestMap.set(ip, {
        isBlocked: false,
        blockUntil: null,
        timestamps: filtered,
      });
    }
  }
}, 60_000);