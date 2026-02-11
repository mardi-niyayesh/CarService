import type {ThrottlerModuleOptions} from "@nestjs/throttler";

const ONE_MINUTE = 60_000;
const BLOCK_DURATION = ONE_MINUTE * 5;

export const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [{
    ttl: process.env.NODE_ENV === 'production' ? ONE_MINUTE : 1000,
    limit: process.env.NODE_ENV === 'production' ? 10 : 15,
    blockDuration: process.env.NODE_ENV === 'production' ? ONE_MINUTE * 5 : ONE_MINUTE * 10,
  }],
  errorMessage: () => `Too many requests. Try again ${BLOCK_DURATION / ONE_MINUTE} minutes later.`,
};