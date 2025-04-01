import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';

/**
 * Clears all downloaded CodePush updates.
 *
 * This is useful when switching to a different release channel which may have an older release than the current package.
 * Note: we don’t recommend using this method in scenarios other than that (CodePush will call
 * this method automatically when needed in other cases) as it could lead to unpredictable behavior.
 */
export function clearUpdates() {
  return NativeRNAppZungCodePushModule.clearUpdates();
}
