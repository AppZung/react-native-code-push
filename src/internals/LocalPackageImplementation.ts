import type { InstallMode } from '../enums/InstallMode.enum';
import type { LocalPackage } from '../types';
import { NativeRNAppZungCodePushModule } from './NativeRNAppZungCodePushModule';

export class LocalPackageImplementation implements LocalPackage {
  constructor(localPackageData: Omit<LocalPackage, 'install'>) {
    Object.assign(this, localPackageData);

    this.install = async (
      installMode = NativeRNAppZungCodePushModule.getConstants().codePushInstallModeOnNextRestart,
      minimumBackgroundDuration = 0,
      updateInstalledCallback?: () => Promise<void> | void,
    ) => {
      const { ...localPackageCopy } = localPackageData;
      await NativeRNAppZungCodePushModule.installUpdate(localPackageCopy, installMode, minimumBackgroundDuration);

      if (installMode === NativeRNAppZungCodePushModule.getConstants().codePushInstallModeImmediate) {
        await updateInstalledCallback?.();
        await NativeRNAppZungCodePushModule.restartApp(false);
        return;
      }

      await NativeRNAppZungCodePushModule.clearPendingRestart();
      this.isPending = true; // Mark the package as pending since it hasn't been applied yet
      await updateInstalledCallback?.();
    };
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

  install: (
    installMode?: InstallMode,
    minimumBackgroundDuration?: number,
    onUpdateInstalled?: () => Promise<void> | void,
  ) => Promise<void>;
}
