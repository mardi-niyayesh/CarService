import {Injectable, NestMiddleware} from '@nestjs/common';
import type {Request, Response, NextFunction} from 'express';

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUEST = 10;
const BLOCK_TIMEOUT_MS = 5 * WINDOW_MS;
const requestMap = new Map<string, {
  isBlocked: boolean;
  blockUntil: number | null;
  timestamps: number[];
}>();

@Injectable()
export class ReateLimitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] as string || req.ip as string;
    const now = Date.now();

    if (!requestMap.has(ip)) {
      requestMap.set(ip, {
        isBlocked: false,
        blockUntil: null,
        timestamps: [],
      });
    }

    const record = requestMap.get(ip)!;

    if (record.isBlocked) {
      if (now < record.blockUntil!) {
        return res.status(429).json({
          message: 'Too many requests. Try again later',
        });
      }

      record.isBlocked = false;
      record.blockUntil = null;
      record.timestamps = [];
    }

    const filtered = record.timestamps.filter(t => now - t < WINDOW_MS);

    if (filtered.length >= MAX_REQUEST) {
      record.isBlocked = true;
      record.blockUntil = Date.now() + BLOCK_TIMEOUT_MS;
      record.timestamps = [];

      return res.status(429).json({
        message: 'Too many requests. Try again later',
      });
    }

    filtered.push(now);

    record.timestamps = filtered;

    return next();
  }
}

/** clear requestMap every 6 minutes */
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