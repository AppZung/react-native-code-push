import { NativeRNAppZungCodePushModule } from './NativeRNAppZungCodePushModule';
import type { Configuration } from './types';

let config: Configuration;

export async function getConfiguration() {
  if (!config) {
    config = await NativeRNAppZungCodePushModule.getConfiguration();
  }

  return config;
}

export async function reloadCachedConfiguration() {
  config = await NativeRNAppZungCodePushModule.getConfiguration();
}
