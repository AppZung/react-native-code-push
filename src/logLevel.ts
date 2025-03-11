import { LogLevel } from './enums/LogLevel.enum';

let logLevel = LogLevel.INFO;

export const setLogLevel = (level: LogLevel) => {
  logLevel = level;
};

export const getLogLevel = () => logLevel;
