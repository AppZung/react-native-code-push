import type { LogLevel } from '../../enums/LogLevel.enum';
import { getLogLevel } from '../../logLevel';

/* Logs messages to console with the [CodePush] prefix */
export function log(level: LogLevel, message: string): void {
  const currentLogLevel = getLogLevel();
  if (level < currentLogLevel) {
    return;
  }

  console.log(`[CodePush] ${message}`);
}
