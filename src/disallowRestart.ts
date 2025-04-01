import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';

/**
 * Forbid CodePush to restart the app.
 *
 * This is an advanced API, and is useful when a component within your app (for example an onboarding process) needs to ensure that no end-user interruptions can occur during its lifetime.
 */
export function disallowRestart() {
  return NativeRNAppZungCodePushModule.disallow();
}
