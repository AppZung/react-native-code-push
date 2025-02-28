import type { ApiSdkConfiguration } from './CodePushApiSdk.types';

export interface Configuration extends ApiSdkConfiguration {
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
