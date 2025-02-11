import { NativeRNAppZungCodePushModule } from '../internals/NativeRNAppZungCodePushModule';

/**
 * Indicates the state that an update is currently in.
 */
export enum UpdateState {
  /**
   * Indicates that an update represents the version of the app that is currently running.
   *
   * This can be useful for identifying attributes about the app, for scenarios such as displaying the release description in a "what's new?" dialog or reporting the latest version to an analytics and/or crash reporting service.
   */
  RUNNING = NativeRNAppZungCodePushModule.getConstants().codePushUpdateStateRunning,

  /**
   * Indicates than an update has been installed, but the app hasn't been restarted yet in order to apply it.
   *
   * This can be useful for determining whether there is a pending update, which you may want to force a programmatic restart (via `restartApp`) in order to apply.
   */
  PENDING = NativeRNAppZungCodePushModule.getConstants().codePushUpdateStatePending,

  /**
   * Indicates than an update represents the latest available release, and can be either currently running or pending.
   */
  LATEST = NativeRNAppZungCodePushModule.getConstants().codePushUpdateStateLatest,
}
