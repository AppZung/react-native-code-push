import { NativeRNAppZungCodePushModule } from '../internals/NativeRNAppZungCodePushModule';

/**
 * Indicates when you would like an installed update to actually be applied.
 */
export enum InstallMode {
  /**
   * Indicates that you want to install the update and restart the app immediately.
   */
  IMMEDIATE = NativeRNAppZungCodePushModule.getConstants().codePushInstallModeImmediate,

  /**
   * Indicates that you want to install the update, but not forcibly restart the app.
   */
  ON_NEXT_RESTART = NativeRNAppZungCodePushModule.getConstants().codePushInstallModeOnNextRestart,

  /**
   * Indicates that you want to install the update, but don't want to restart the app until the next time
   * the end user resumes it from the background. This way, you don't disrupt their current session,
   * but you can get the update in front of them sooner than having to wait for the next natural restart.
   * This value is appropriate for silent installs that can be applied on resume in a non-invasive way.
   */
  ON_NEXT_RESUME = NativeRNAppZungCodePushModule.getConstants().codePushInstallModeOnNextResume,

  /**
   * Indicates that you want to install the update when the app is in the background,
   * but only after it has been in the background for "minimumBackgroundDuration" seconds (0 by default),
   * so that user context isn't lost unless the app suspension is long enough to not matter.
   */
  ON_NEXT_SUSPEND = NativeRNAppZungCodePushModule.getConstants().codePushInstallModeOnNextSuspend,
}
