import type {
    DownloadProgressCallback,
    HandleBinaryVersionMismatchCallback,
    SyncOptions,
    SyncStatusChangedCallback,
    UpdateDialog
} from "./types";
import { log } from "./internals/utils/log";
import { SyncStatus } from "./enums/SyncStatus.enum";
import { shouldUpdateBeIgnored } from "./internals/shouldUpdateBeIgnored";
import { checkForUpdate } from "./checkForUpdates";
import { InstallMode } from "./enums/InstallMode.enum";
import { getCurrentPackage } from "./internals/getCurrentPackage";
import { notifyAppReady } from "./notifyAppReady";
import { Alert, type AlertButton, Platform } from "react-native";

/**
 * Represents the default settings that will be used by the sync method if
 * an update dialog is configured to be displayed.
 */
export const DEFAULT_UPDATE_DIALOG: UpdateDialog = {
    appendReleaseDescription: false,
    descriptionPrefix: " Description: ",
    mandatoryContinueButtonLabel: "Continue",
    mandatoryUpdateMessage: "An update is available that must be installed.",
    optionalIgnoreButtonLabel: "Ignore",
    optionalInstallButtonLabel: "Install",
    optionalUpdateMessage: "An update is available. Would you like to install it?",
    title: "Update available"
};

/*
 * The syncInternal method provides a simple, one-line experience for
 * incorporating the check, download and installation of an update.
 *
 * It simply composes the existing API methods together and adds additional
 * support for respecting mandatory updates, ignoring previously failed
 * releases, and displaying a standard confirmation UI to the end-user
 * when an update is available.
 */
async function syncInternal(options?: SyncOptions, syncStatusChangeCallback?: SyncStatusChangedCallback, downloadProgressCallback?: DownloadProgressCallback, handleBinaryVersionMismatchCallback?: HandleBinaryVersionMismatchCallback): Promise<SyncStatus> {
    let resolvedInstallMode: InstallMode | undefined;
    const syncOptions: SyncOptions = {
        releaseChannelPublicId: undefined,
        ignoreFailedUpdates: true,
        rollbackRetryOptions: undefined,
        installMode: InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: InstallMode.IMMEDIATE,
        minimumBackgroundDuration: 0,
        updateDialog: undefined,
        ...options
    };

    syncStatusChangeCallback = typeof syncStatusChangeCallback === "function"
        ? syncStatusChangeCallback
        : (syncStatus: SyncStatus) => {
            switch (syncStatus) {
                case SyncStatus.CHECKING_FOR_UPDATE:
                    log("Checking for update.");
                    break;
                case SyncStatus.AWAITING_USER_ACTION:
                    log("Awaiting user action.");
                    break;
                case SyncStatus.DOWNLOADING_PACKAGE:
                    log("Downloading package.");
                    break;
                case SyncStatus.INSTALLING_UPDATE:
                    log("Installing update.");
                    break;
                case SyncStatus.UP_TO_DATE:
                    log("App is up to date.");
                    break;
                case SyncStatus.UPDATE_IGNORED:
                    log("User cancelled the update.");
                    break;
                case SyncStatus.UPDATE_INSTALLED:
                    if (resolvedInstallMode == InstallMode.ON_NEXT_RESTART) {
                        log("Update is installed and will be run on the next app restart.");
                    } else if (resolvedInstallMode == InstallMode.ON_NEXT_RESUME) {
                        if (!!syncOptions.minimumBackgroundDuration) {
                            log(`Update is installed and will be run after the app has been in the background for at least ${syncOptions.minimumBackgroundDuration} seconds.`);
                        } else {
                            log("Update is installed and will be run when the app next resumes.");
                        }
                    }
                    break;
                case SyncStatus.UNKNOWN_ERROR:
                    log("An unknown error occurred.");
                    break;
            }
        };

    try {
        await notifyAppReady();

        syncStatusChangeCallback(SyncStatus.CHECKING_FOR_UPDATE);
        const remotePackage = await checkForUpdate(syncOptions.releaseChannelPublicId, handleBinaryVersionMismatchCallback);

        const doDownloadAndInstall = async () => {
            if (!remotePackage) {
                throw new Error("remotePackage should be defined");
            }

            syncStatusChangeCallback(SyncStatus.DOWNLOADING_PACKAGE);
            const localPackage = await remotePackage.download(downloadProgressCallback);

            // Determine the correct install mode based on whether the update is mandatory or not.
            resolvedInstallMode = localPackage.isMandatory ? syncOptions.mandatoryInstallMode : syncOptions.installMode;

            syncStatusChangeCallback(SyncStatus.INSTALLING_UPDATE);
            await localPackage.install(resolvedInstallMode, syncOptions.minimumBackgroundDuration, () => {
                syncStatusChangeCallback(SyncStatus.UPDATE_INSTALLED);
            });

            return SyncStatus.UPDATE_INSTALLED;
        };

        const updateShouldBeIgnored = await shouldUpdateBeIgnored(remotePackage, syncOptions);

        if (!remotePackage || updateShouldBeIgnored) {
            if (updateShouldBeIgnored) {
                log("An update is available, but it is being ignored due to having been previously rolled back.");
            }

            const currentPackage = await getCurrentPackage();
            if (currentPackage && currentPackage.isPending) {
                syncStatusChangeCallback(SyncStatus.UPDATE_INSTALLED);
                return SyncStatus.UPDATE_INSTALLED;
            } else {
                syncStatusChangeCallback(SyncStatus.UP_TO_DATE);
                return SyncStatus.UP_TO_DATE;
            }
        } else if (syncOptions.updateDialog) {
            const updateDialogConfig = typeof syncOptions.updateDialog !== "object" ? DEFAULT_UPDATE_DIALOG : { ...DEFAULT_UPDATE_DIALOG, ...syncOptions.updateDialog };

            return await new Promise((resolve, reject) => {
                let message: string | undefined;
                let installButtonText: string | undefined;

                const dialogButtons: AlertButton[] = [];

                if (remotePackage.isMandatory) {
                    message = updateDialogConfig.mandatoryUpdateMessage;
                    installButtonText = updateDialogConfig.mandatoryContinueButtonLabel;
                } else {
                    message = updateDialogConfig.optionalUpdateMessage;
                    installButtonText = updateDialogConfig.optionalInstallButtonLabel;
                    // Since this is an optional update, add a button
                    // to allow the end-user to ignore it
                    dialogButtons.push({
                        text: updateDialogConfig.optionalIgnoreButtonLabel ?? "",
                        onPress: () => {
                            syncStatusChangeCallback(SyncStatus.UPDATE_IGNORED);
                            resolve(SyncStatus.UPDATE_IGNORED);
                        }
                    });
                }

                // Since the install button should be placed to the
                // right of any other button, add it last
                dialogButtons.push({
                    text: installButtonText ?? "",
                    onPress: () => {
                        doDownloadAndInstall()
                            .then(resolve, reject);
                    }
                });

                // If the update has a description, and the developer
                // explicitly chose to display it, then set that as the message
                if (updateDialogConfig.appendReleaseDescription && remotePackage.description) {
                    message += `${updateDialogConfig.descriptionPrefix} ${remotePackage.description}`;
                }

                syncStatusChangeCallback(SyncStatus.AWAITING_USER_ACTION);
                Alert.alert(updateDialogConfig.title || "", message || "", Platform.OS === "android" ? [...dialogButtons.reverse()] : dialogButtons);
            });
        } else {
            return await doDownloadAndInstall();
        }
    } catch (error) {
        syncStatusChangeCallback(SyncStatus.UNKNOWN_ERROR);
        log(error != null && typeof error === "object" && "message" in error && typeof error.message === "string" ? error.message : "Unknown");
        throw error;
    }
}

/**
 * Allows checking for an update, downloading it and installing it, all with a single call.
 *
 * @param options Options used to configure the end-user update experience (e.g. show a prompt?, install the update immediately?).
 * @param syncStatusChangedCallback An optional callback that allows tracking the status of the sync operation, as opposed to simply checking the resolved state via the returned Promise.
 * @param downloadProgressCallback An optional callback that allows tracking the progress of an update while it is being downloaded.
 * @param handleBinaryVersionMismatchCallback An optional callback for handling target binary version mismatch
 */
export const sync = (() => {
    // This function allows only one syncInternal operation to proceed at any given time.
    // Parallel calls to sync() while one is ongoing yields CodePush.SyncStatus.SYNC_IN_PROGRESS.

    let syncInProgress = false;
    const setSyncCompleted = () => { syncInProgress = false; };

    return (options?: SyncOptions, syncStatusChangeCallback?: SyncStatusChangedCallback, downloadProgressCallback?: DownloadProgressCallback, handleBinaryVersionMismatchCallback?: HandleBinaryVersionMismatchCallback): Promise<SyncStatus> => {
        let syncStatusCallbackWithTryCatch: SyncStatusChangedCallback | undefined;
        let downloadProgressCallbackWithTryCatch: DownloadProgressCallback | undefined;

        if (typeof syncStatusChangeCallback === "function") {
            syncStatusCallbackWithTryCatch = (...args) => {
                try {
                    syncStatusChangeCallback(...args);
                } catch (error) {
                    log(`An error has occurred : ${error instanceof Error ? error.stack : "unknown"}`);
                }
            };
        }

        if (typeof downloadProgressCallback === "function") {
            downloadProgressCallbackWithTryCatch = (...args) => {
                try {
                    downloadProgressCallback(...args);
                } catch (error) {
                    log(`An error has occurred: ${error instanceof Error ? error.stack : "unknown"}`);
                }
            };
        }

        if (syncInProgress) {
            typeof syncStatusCallbackWithTryCatch === "function"
                ? syncStatusCallbackWithTryCatch(SyncStatus.SYNC_IN_PROGRESS)
                : log("Sync already in progress.");
            return Promise.resolve(SyncStatus.SYNC_IN_PROGRESS);
        }

        syncInProgress = true;

        const syncPromise = syncInternal(options, syncStatusCallbackWithTryCatch, downloadProgressCallbackWithTryCatch, handleBinaryVersionMismatchCallback);

        syncPromise
            .then(setSyncCompleted)
            .catch(setSyncCompleted);

        return syncPromise;
    };
})();
