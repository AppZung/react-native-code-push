import { NativeEventEmitter } from "react-native";
import { NativeRNAppZungCodePushModule } from "./NativeRNAppZungCodePushModule";
import type { DownloadProgressCallback, RemotePackage } from "../types";
import type { Package } from "code-push/script/acquisition-sdk";
import { log } from "./utils/log";
import { LocalPackageImplementation } from "./LocalPackageImplementation";
import { cloneWithoutFunctions } from "./utils/cloneWithoutFunctions";

export class RemotePackageImpl implements RemotePackage {
    constructor(remotePackageData: Omit<RemotePackage, "download">, private readonly reportStatusDownload?: (downloadedPackage: Package) => Promise<void>) {
        Object.assign(this, remotePackageData);
    }

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

    async download(downloadProgressCallback: DownloadProgressCallback) {
        if (!this.downloadUrl) {
            throw new Error("Cannot download an update without a download url");
        }

        let downloadProgressSubscription;

        if (downloadProgressCallback) {
            const codePushEventEmitter = new NativeEventEmitter(NativeRNAppZungCodePushModule);
            // Use event subscription to obtain download progress.
            downloadProgressSubscription = codePushEventEmitter.addListener(
                "CodePushDownloadProgress",
                downloadProgressCallback
            );
        }

        // Use the downloaded package info. Native code will save the package info
        // so that the client knows what the current package version is.
        try {
            const updatePackageCopy = cloneWithoutFunctions(this); // In dev mode, React Native deep freezes any object queued over the bridge
            const downloadedPackage = await NativeRNAppZungCodePushModule.downloadUpdate(updatePackageCopy, !!downloadProgressCallback);

            if (this.reportStatusDownload) {
                this.reportStatusDownload({
                    ...this,
                    deploymentKey: this.releaseChannelPublicId,
                })
                    .catch((err) => {
                        log(`Report download status failed: ${err}`);
                    });
            }

            return new LocalPackageImplementation(downloadedPackage);
        } finally {
            downloadProgressSubscription && downloadProgressSubscription.remove();
        }
    }
}
