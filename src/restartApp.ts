import { NativeRNAppZungCodePushModule } from "./internals/NativeRNAppZungCodePushModule";

/**
 * Immediately restarts the app.
 *
 * @param onlyIfUpdateIsPending Indicates whether you want the restart to no-op if there isn't currently a pending update.
 */
export async function restartApp(onlyIfUpdateIsPending = false) {
    NativeRNAppZungCodePushModule.restartApp(onlyIfUpdateIsPending);
}
