import { NativeEventEmitter } from 'react-native';
import type { DownloadProgressCallback, LocalPackage, RemotePackage } from '../types';
import type { ApiSdkDownloadReportPackageInfo } from './CodePushApiSdk.types';
import { LocalPackageImplementation } from './LocalPackageImplementation';
import { NativeRNAppZungCodePushModule } from './NativeRNAppZungCodePushModule';
import { log } from './utils/log';

export class RemotePackageImpl implements RemotePackage {
  constructor(
    remotePackageData: Omit<RemotePackage, 'download'>,
    reportStatusDownload: (downloadedPackage: ApiSdkDownloadReportPackageInfo) => Promise<void>,
  ) {
    Object.assign(this, remotePackageData);

    this.download = async (downloadProgressCallback?: DownloadProgressCallback) => {
      if (!this.downloadUrl) {
        throw new Error('Cannot download an update without a download url');
      }

      let downloadProgressSubscription;

      if (downloadProgressCallback) {
        const codePushEventEmitter = new NativeEventEmitter(NativeRNAppZungCodePushModule);
        // Use event subscription to obtain download progress.
        downloadProgressSubscription = codePushEventEmitter.addListener(
          'CodePushDownloadProgress',
          downloadProgressCallback,
        );
      }

      // Use the downloaded package info. Native code will save the package info
      // so that the client knows what the current package version is.
      try {
        const { ...updatePackageCopy } = remotePackageData; // In dev mode, React Native deep freezes any object queued over the bridge
        const downloadedPackage = await NativeRNAppZungCodePushModule.downloadUpdate(
          updatePackageCopy,
          !!downloadProgressCallback,
        );

        if (reportStatusDownload) {
          const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 250));
          const reportPromise = reportStatusDownload({
            label: this.label,
          }).catch((error) => {
            log(`Report download status failed: ${error}`);
          });
          await Promise.race([timeoutPromise, reportPromise]);
        }

        return new LocalPackageImplementation(downloadedPackage);
      } finally {
        downloadProgressSubscription && downloadProgressSubscription.remove();
      }
    };
  }

  download: (downloadProgressCallback?: DownloadProgressCallback) => Promise<LocalPackage>;

  appVersion!: string;
  description!: string;
  downloadUrl!: string;
  failedInstall!: boolean;
  isFirstRun!: boolean;
  isMandatory!: boolean;
  isPending = false; // A remote package could never be in a pending state
  label!: string;
  packageHash!: string;
  packageSize!: number;
  releaseChannelPublicId!: string;
}
