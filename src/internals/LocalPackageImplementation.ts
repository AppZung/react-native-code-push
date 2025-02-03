import { NativeRNAppZungCodePushModule } from "./NativeRNAppZungCodePushModule";
import type { LocalPackage } from "../types";
import { cloneWithoutFunctions } from "./utils/cloneWithoutFunctions";

export class LocalPackageImplementation implements LocalPackage {
    constructor(localPackageData: LocalPackage) {
        Object.assign(this, localPackageData);
    }

    appVersion!: string;
    description!: string;
    failedInstall!: boolean;
    isFirstRun!: boolean;
    isMandatory!: boolean;
    isPending = false; // A local package wouldn't be pending until it was installed
    label!: string;
    packageHash!: string;
    packageSize!: number;
    releaseChannelPublicId!: string;

    async install(installMode = NativeRNAppZungCodePushModule.codePushInstallModeOnNextRestart, minimumBackgroundDuration = 0, updateInstalledCallback?: () => (Promise<void> | void)) {
        const localPackageCopy = cloneWithoutFunctions(this); // In dev mode, React Native deep freezes any object queued over the bridge
        await NativeRNAppZungCodePushModule.installUpdate(localPackageCopy, installMode, minimumBackgroundDuration);

        if (installMode === NativeRNAppZungCodePushModule.codePushInstallModeImmediate) {
            await updateInstalledCallback?.();
            NativeRNAppZungCodePushModule.restartApp(false);
            return;
        }

        NativeRNAppZungCodePushModule.clearPendingRestart();
        this.isPending = true; // Mark the package as pending since it hasn't been applied yet
        await updateInstalledCallback?.();
    }
}
