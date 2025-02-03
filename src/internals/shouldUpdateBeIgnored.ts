import type { RemotePackage, RollbackRetryOptions, SyncOptions } from '../types';
import { NativeRNAppZungCodePushModule } from './NativeRNAppZungCodePushModule';
import { log } from './utils/log';

const DEFAULT_ROLLBACK_RETRY_OPTIONS = {
  delayInHours: 24,
  maxRetryAttempts: 1,
};

// TODO type latestRollbackInfo
function validateLatestRollbackInfo(latestRollbackInfo: any, packageHash: string) {
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
    log("The 'delayInHours' rollback retry parameter must be a number.");
    return false;
  }

  if (typeof rollbackRetryOptions.maxRetryAttempts !== 'number') {
    log("The 'maxRetryAttempts' rollback retry parameter must be a number.");
    return false;
  }

  if (rollbackRetryOptions.maxRetryAttempts < 1) {
    log("The 'maxRetryAttempts' rollback retry parameter cannot be less then 1.");
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
    log('The latest rollback info is not valid.');
    return true;
  }

  const { delayInHours, maxRetryAttempts } = rollbackRetryOptions;
  const hoursSinceLatestRollback = (Date.now() - latestRollbackInfo.time) / (1000 * 60 * 60);
  if (hoursSinceLatestRollback >= delayInHours && maxRetryAttempts >= latestRollbackInfo.count) {
    log('Previous rollback should be ignored due to rollback retry options.');
    return false;
  }

  return true;
}
