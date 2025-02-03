import { type TurboModule } from 'react-native';
import type { InstallMode } from '../enums/InstallMode.enum';
import type { UpdateState } from '../enums/UpdateState.enum';
import type { LocalPackage, RemotePackage, StatusReport } from '../types';
import type { Configuration, LatestRollbackInfo, OmitFunctions } from './types';

export interface Spec extends TurboModule {
  addListener: (eventName: string) => void;
  removeListeners: (count: number) => void;

  getConstants(): {
    codePushInstallModeImmediate: number;
    codePushInstallModeOnNextRestart: number;
    codePushInstallModeOnNextResume: number;
    codePushInstallModeOnNextSuspend: number;

    codePushUpdateStateLatest: number;
    codePushUpdateStatePending: number;
    codePushUpdateStateRunning: number;
  };

  getConfiguration(): Promise<Configuration>;

  getUpdateMetadata(updateState: UpdateState): Promise<OmitFunctions<LocalPackage>>;
  installUpdate(
    localPackage: OmitFunctions<LocalPackage>,
    installMode: InstallMode,
    minimumBackgroundDuration: number,
  ): Promise<void>;
  downloadUpdate(
    remotePackage: OmitFunctions<RemotePackage>,
    notifyProgress: boolean,
  ): Promise<OmitFunctions<LocalPackage>>;

  restartApp(onlyIfUpdateIsPending: boolean): Promise<void>;
  clearPendingRestart(): Promise<void>;

  disallow(): Promise<void>;
  allow(): Promise<void>;

  clearUpdates(): void;

  notifyApplicationReady(): Promise<void>;
  setLatestRollbackInfo(packageHash: string): Promise<void>;

  getNewStatusReport(): Promise<StatusReport>;
  recordStatusReported(statusReport: StatusReport): void;
  saveStatusReportForRetry(statusReport: StatusReport): void;

  getLatestRollbackInfo(): Promise<LatestRollbackInfo>;

  isFirstRun(packageHash: string): Promise<boolean>;
  isFailedUpdate(packageHash: string): Promise<boolean>;
}
