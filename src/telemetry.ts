import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';
import { reloadCachedConfiguration } from './internals/getConfiguration';

/**
 * Controls telemetry reporting.
 *
 * @param enabled - When false, updates on this device will stop appearing as failed, pending or succeeded in analytics.
 */
export async function setTelemetryEnabled(enabled: boolean): Promise<void> {
  await NativeRNAppZungCodePushModule.setTelemetryEnabled(enabled);
  await reloadCachedConfiguration();
}

/**
 * Gets the current telemetry enabled status.
 *
 * When setTelemetryEnabled has never been enabled, returns the default value set in your configuration.
 */
export function getTelemetryEnabled(): Promise<boolean> {
  return NativeRNAppZungCodePushModule.getTelemetryEnabled();
}
