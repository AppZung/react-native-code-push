import type { LogLevel } from '../enums/LogLevel.enum';

export type LoggerFunction = (level: LogLevel, message: string) => void;

const defaultLogger: LoggerFunction = (_level: LogLevel, message: string): void => {
  console.log(`[CodePush] ${message}`);
};

let currentLogger: LoggerFunction = defaultLogger;

/**
 * Set a custom logger function to handle all CodePush logs
 *
 * @param logger A function that takes a log level and message and handles the logging
 * @example
 * ```
 * import { setLogger, LogLevel } from '@appzung/react-native-code-push';
 *
 * // Custom logger that sends critical logs to a crash reporting service
 * setLogger((level, message) => {
 *   // Always log to console
 *   console.log(`[CodePush] ${message}`);
 *
 *   // Send error logs to crash reporting
 *   if (level === LogLevel.ERROR) {
 *     MyCrashReportingService.log(`CodePush error: ${message}`);
 *   }
 * });
 * ```
 */
export const setLogger = (logger: LoggerFunction): void => {
  currentLogger = logger;
};

/**
 * Get the current logger function
 * @returns The current logger function
 */
export const getLogger = (): LoggerFunction => currentLogger;

/**
 * Reset the logger to the default implementation
 */
export const resetLogger = (): void => {
  currentLogger = defaultLogger;
};
