import type { Configuration as BaseConfiguration } from 'code-push/script/acquisition-sdk';

export interface Configuration extends BaseConfiguration {
  releaseChannelPublicId: string;
  packageHash?: string;
}

export interface LatestRollbackInfo {
  time: number;
  count: number;
  packageHash: string;
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

export type OmitFunctions<T extends object> = Omit<T, FunctionPropertyNames<T>>;
