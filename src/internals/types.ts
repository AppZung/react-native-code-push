import type { Configuration as BaseConfiguration } from 'code-push/script/acquisition-sdk';

export interface Configuration extends BaseConfiguration {
  releaseChannelPublicId: string;
  packageHash?: string;
}
