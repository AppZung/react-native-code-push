import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';
import { reloadCachedConfiguration } from './internals/getConfiguration';

/**
 * Resets the client's unique ID. You may use this in some GDPR compliance scenarios. Note that this will create a new MAU if a new request is sent later.
 */
export const resetClientUniqueId = async () => {
  const newId = await NativeRNAppZungCodePushModule.resetClientUniqueId();
  await reloadCachedConfiguration();
  return newId;
};
