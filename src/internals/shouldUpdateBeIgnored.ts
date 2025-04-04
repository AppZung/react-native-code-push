import { LogLevel } from '../enums/LogLevel.enum';
import type { RemotePackage, RollbackRetryOptions, SyncOptions } from '../types';
import { NativeRNAppZungCodePushModule } from './NativeRNAppZungCodePushModule';
import type { LatestRollbackInfo } from './types';
import { log } from './utils/log';

const DEFAULT_ROLLBACK_RETRY_OPTIONS = {
  delayInHours: 24,
  maxRetryAttempts: 1,
};

function validateLatestRollbackInfo(latestRollbackInfo: LatestRollbackInfo, packageHash: string) {
  return (
    latestRollbackInfo &&
    latestRollbackInfo.time &&
    latestRollbackInfo.count &&
    latestRollbackInfo.packageHash &&
    latestRollbackInfo.packageHash === packageHash
  );
}

function validateRollbackRetryOptions(rollbackRetryOptions: RollbackRetryOptions) {
  if (typeof rollbackRetryOptions.delayInHours !== 'number') {
    log(LogLevel.ERROR, "The 'delayInHours' rollback retry parameter must be a number.");
    return false;
  }

  if (typeof rollbackRetryOptions.maxRetryAttempts !== 'number') {
    log(LogLevel.ERROR, "The 'maxRetryAttempts' rollback retry parameter must be a number.");
    return false;
  }

  if (rollbackRetryOptions.maxRetryAttempts < 1) {
    log(LogLevel.ERROR, "The 'maxRetryAttempts' rollback retry parameter cannot be less then 1.");
    return false;
  }

  return true;
}

export async function shouldUpdateBeIgnored(remotePackage: RemotePackage | null | undefined, syncOptions: SyncOptions) {
  const isFailedPackage = remotePackage && remotePackage.failedInstall;
  if (!isFailedPackage || !syncOptions.ignoreFailedUpdates) {
    return false;
  }

  if (!syncOptions.rollbackRetryOptions) {
    return true;
  }

  const rollbackRetryOptions: Required<RollbackRetryOptions> =
    typeof syncOptions.rollbackRetryOptions === 'object'
      ? {
          ...DEFAULT_ROLLBACK_RETRY_OPTIONS,
          ...syncOptions.rollbackRetryOptions,
        }
      : DEFAULT_ROLLBACK_RETRY_OPTIONS;

  if (!validateRollbackRetryOptions(rollbackRetryOptions)) {
    return true;
  }

  const latestRollbackInfo = await NativeRNAppZungCodePushModule.getLatestRollbackInfo();
  if (!validateLatestRollbackInfo(latestRollbackInfo, remotePackage.packageHash)) {
    log(LogLevel.ERROR, 'The latest rollback info is not valid.');
    return true;
  }

  const { delayInHours, maxRetryAttempts } = rollbackRetryOptions;
  const hoursSinceLatestRollback = (Date.now() - latestRollbackInfo.time) / (1000 * 60 * 60);
  if (hoursSinceLatestRollback >= delayInHours && maxRetryAttempts >= latestRollbackInfo.count) {
    log(LogLevel.INFO, 'Previous rollback should be ignored due to rollback retry options.');
    return false;
  }

  return true;
}
