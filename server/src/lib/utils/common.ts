import {Logger} from "@nestjs/common";

export function getNestLogger(resource: string): Logger {
  return new Logger(resource, {timestamp: true});
}