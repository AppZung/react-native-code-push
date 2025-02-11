import { getConfiguration } from './internals/getConfiguration';

/**
 * Gets the client's unique ID set by the module. You may also see resetClientUniqueId.
 */
export const getClientUniqueId = async () => {
  const nativeConfig = await getConfiguration();
  return nativeConfig.clientUniqueId;
};
