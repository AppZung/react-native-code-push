import { NativeRNAppZungCodePushModule } from "./internals/NativeRNAppZungCodePushModule";

/**
 * Forbid CodePush to restart the app.
 */
export const disallowRestart: () => void = NativeRNAppZungCodePushModule.disallow;
