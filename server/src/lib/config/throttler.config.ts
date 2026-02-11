import type {ThrottlerModuleOptions} from "@nestjs/throttler";

export const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [{
    ttl: process.env.NODE_ENV === 'production' ? 60_000 : 1000,
    limit: process.env.NODE_ENV === 'production' ? 10 : 15,
  }]
};