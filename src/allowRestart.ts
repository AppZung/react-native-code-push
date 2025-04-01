import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';

/**
 * Allow CodePush to restart the app.
 *
 * This is an advanced API and is only necessary if your app explicitly disallowed restarts via the `disallowRestart` method.
 */
export function allowRestart() {
  return NativeRNAppZungCodePushModule.allow();
}
