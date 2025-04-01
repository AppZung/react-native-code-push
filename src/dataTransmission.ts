import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';
import { reloadCachedConfiguration } from './internals/getConfiguration';

/**
 * Controls data transmission for CodePush. This may be used for privacy optIn.
 *
 * @param enabled - When false, disables all external API calls to CodePush servers. Checking for updates will be disabled.
 */
export async function setDataTransmissionEnabled(enabled: boolean): Promise<void> {
  await NativeRNAppZungCodePushModule.setDataTransmissionEnabled(enabled);
  await reloadCachedConfiguration();
}

/**
 * Gets the current data transmission status.
 *
 * When setDataTransmissionEnabled has never been called, returns the default value set in your configuration.
 */
export function getDataTransmissionEnabled(): Promise<boolean> {
  return NativeRNAppZungCodePushModule.getDataTransmissionEnabled();
}
