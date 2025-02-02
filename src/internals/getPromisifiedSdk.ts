import type { Http, NativeUpdateNotification, RemotePackage, Package } from "code-push/script/acquisition-sdk";
import type { Configuration } from "./types";
import { AcquisitionSdk } from "./AcquisitionSdk";

export type PromisifiedSdkQueryPackage = Pick<Package, "appVersion"> & { packageHash?: string };

type PromisifiedSdk = {
    queryUpdateWithCurrentPackage: (queryPackage: PromisifiedSdkQueryPackage) => Promise<RemotePackage | NativeUpdateNotification>;
    reportStatusDeploy: (deployedPackage?: Package, status?: string, previousLabelOrAppVersion?: string, previousDeploymentKey?: string) => Promise<void>;
    reportStatusDownload: (downloadedPackage: Package) => Promise<void>;
};

export function getPromisifiedSdk(requestFetchAdapter: Http.Requester, config: Configuration): PromisifiedSdk {
    // TODO MIGRATION Temporary retro-compat while we still use code-push module
    config.deploymentKey = config.releaseChannelPublicId;

    const sdk = new AcquisitionSdk(requestFetchAdapter, config);

    return {
        queryUpdateWithCurrentPackage: (queryPackage) => {
            return new Promise<RemotePackage | NativeUpdateNotification>((resolve, reject) => {
                // @ts-expect-error sdk typing is wrong
                AcquisitionSdk.prototype.queryUpdateWithCurrentPackage.call(sdk, queryPackage, (err, update) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(update);
                });
            });
        },
        reportStatusDeploy: (deployedPackage, status, previousLabelOrAppVersion, previousReleaseChannelPublicId) => {
            return new Promise<void>((resolve, reject) => {
                AcquisitionSdk.prototype.reportStatusDeploy.call(sdk, deployedPackage, status, previousLabelOrAppVersion, previousReleaseChannelPublicId, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve();
                });
            });
        },
        reportStatusDownload: (downloadedPackage) => {
            return new Promise<void>((resolve, reject) => {
                AcquisitionSdk.prototype.reportStatusDownload.call(sdk, downloadedPackage, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve();
                });
            });
        }
    };
}
