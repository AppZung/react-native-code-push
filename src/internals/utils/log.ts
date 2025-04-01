import type { LogLevel } from '../../enums/LogLevel.enum';
import { getLogLevel } from '../../logLevel';
import { getLogger } from '../logger';

/* Logs messages using the configured logger */
export function log(level: LogLevel, message: string): void {
  const currentLogLevel = getLogLevel();
  if (level < currentLogLevel) {
    return;
  }

  const logger = getLogger();
  logger(level, message);
}
