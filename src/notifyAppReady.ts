import { AppState, type NativeEventSubscription } from 'react-native';
import { CodePushApiSdk } from './internals/CodePushApiSdk';
import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';
import { getConfiguration } from './internals/getConfiguration';
import { log } from './internals/utils/log';
import { requestFetchAdapter } from './internals/utils/request-fetch-adapter';
import type { StatusReport } from './types';

/**
 * Notifies the CodePush runtime that an installed update is considered successful.
 *
 * If you are manually checking for and installing updates (i.e. not using the `sync` method to handle it all for you), then this method **MUST** be called; otherwise CodePush will treat the update as failed and rollback to the previous version when the app next restarts.
 */
export const notifyAppReady = (() => {
  // This ensures that notifyApplicationReadyInternal is only called once
  // in the lifetime of this module instance.
  let notifyApplicationReadyPromise: Promise<StatusReport | void> | undefined;

  return () => {
    if (!notifyApplicationReadyPromise) {
      notifyApplicationReadyPromise = notifyApplicationReadyInternal();
    }

    return notifyApplicationReadyPromise;
  };
})();

async function notifyApplicationReadyInternal() {
  await NativeRNAppZungCodePushModule.notifyApplicationReady();
  const statusReport = await NativeRNAppZungCodePushModule.getNewStatusReport();
  statusReport && tryReportStatus(statusReport); // Don't wait for this to complete.

  return statusReport;
}

async function tryReportStatus(statusReport: StatusReport, retryOnAppResume?: NativeEventSubscription) {
  const config = await getConfiguration();
  const previousLabelOrAppVersion = statusReport.previousLabelOrAppVersion ?? null;
  const previousReleaseChannelPublicId = statusReport.previousReleaseChannelPublicId || config.releaseChannelPublicId;
  try {
    if (statusReport.appVersion) {
      log(`Reporting binary update (${statusReport.appVersion})`);

      if (!config.releaseChannelPublicId) {
        throw new Error('Release channel is missing');
      }

      const sdk = new CodePushApiSdk(requestFetchAdapter, config);
      await sdk.reportStatusDeploy(null, previousLabelOrAppVersion, previousReleaseChannelPublicId);
    } else {
      if (!statusReport.package) {
        throw new Error('Missing package in status report');
      }

      const label = statusReport.package.label;
      if (statusReport.status === 'DeploymentSucceeded') {
        log(`Reporting CodePush update success (${label})`);
      } else {
        log(`Reporting CodePush update rollback (${label})`);
        await NativeRNAppZungCodePushModule.setLatestRollbackInfo(statusReport.package.packageHash);
      }

      config.releaseChannelPublicId = statusReport.package.releaseChannelPublicId;
      const sdk = new CodePushApiSdk(requestFetchAdapter, config);
      await sdk.reportStatusDeploy(
        {
          package: statusReport.package,
          status: statusReport.status,
        },
        previousLabelOrAppVersion,
        previousReleaseChannelPublicId,
      );
    }

    NativeRNAppZungCodePushModule.recordStatusReported(statusReport);
    retryOnAppResume && retryOnAppResume.remove();
  } catch (e) {
    log(`Report status failed: ${JSON.stringify(statusReport)}`);
    NativeRNAppZungCodePushModule.saveStatusReportForRetry(statusReport);
    // Try again when the app resumes
    if (!retryOnAppResume) {
      const resumeListener = AppState.addEventListener('change', async (newState) => {
        if (newState !== 'active') return;
        const refreshedStatusReport = await NativeRNAppZungCodePushModule.getNewStatusReport();
        if (refreshedStatusReport) {
          tryReportStatus(refreshedStatusReport, resumeListener);
        } else {
          resumeListener && resumeListener.remove();
        }
      });
    }
  }
}
