import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';

/**
 * Immediately restarts the app.
 *
 * If there is an update pending, it will be immediately displayed to the end user. Otherwise, calling this method simply has the same behavior as the end user killing and restarting the process.
 *
 * @param onlyIfUpdateIsPending Indicates whether you want the restart to no-op if there isn't currently a pending update.
 */
export function restartApp(onlyIfUpdateIsPending = false) {
  return NativeRNAppZungCodePushModule.restartApp(onlyIfUpdateIsPending);
}
