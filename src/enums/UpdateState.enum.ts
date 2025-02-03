import { NativeRNAppZungCodePushModule } from '../internals/NativeRNAppZungCodePushModule';

/**
 * Indicates the state that an update is currently in.
 */
export enum UpdateState {
  /**
   * Indicates that an update represents the
   * version of the app that is currently running.
   */
  RUNNING = NativeRNAppZungCodePushModule.getConstants().codePushUpdateStateRunning,

  /**
   * Indicates than an update has been installed, but the
   * app hasn't been restarted yet in order to apply it.
   */
  PENDING = NativeRNAppZungCodePushModule.getConstants().codePushUpdateStatePending,

  /**
   * Indicates than an update represents the latest available
   * release, and can be either currently running or pending.
   */
  LATEST = NativeRNAppZungCodePushModule.getConstants().codePushUpdateStateLatest,
}
