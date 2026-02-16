import {isProduction} from "./";
import type {ThrottlerModuleOptions} from "@nestjs/throttler";

const ONE_MINUTE = 60_000;
const BLOCK_DURATION: number = ONE_MINUTE * 5;

export const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [{
    ttl: isProduction ? ONE_MINUTE : 1000,
    limit: isProduction ? 10 : 15,
    blockDuration: isProduction ? ONE_MINUTE * 5 : ONE_MINUTE * 10,
  }],
  errorMessage: (): string => `Too many requests. Try again ${BLOCK_DURATION / ONE_MINUTE} minutes later.`,
};