import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';

/**
 * Allow CodePush to restart the app.
 */
export const allowRestart: () => void = NativeRNAppZungCodePushModule.allow;
