import type { SyncStatus } from "./enums/SyncStatus.enum";
import type { InstallMode } from "./enums/InstallMode.enum";
import type { DeploymentStatus } from "./enums/DeploymentStatus.enum";
import type { NativeUpdateNotification } from "code-push/script/acquisition-sdk";

export interface UpdateDialog {
    /**
     * Indicates whether you would like to append the description of an available release to the
     * notification message which is displayed to the end user. Defaults to false.
     */
    appendReleaseDescription?: boolean;

    /**
     * Indicates the string you would like to prefix the release description with, if any, when
     * displaying the update notification to the end user. Defaults to " Description: "
     */
    descriptionPrefix?: string;

    /**
     * The text to use for the button the end user must press in order to install a mandatory update. Defaults to "Continue".
     */
    mandatoryContinueButtonLabel?: string;

    /**
     * The text used as the body of an update notification, when the update is specified as mandatory.
     * Defaults to "An update is available that must be installed.".
     */
    mandatoryUpdateMessage?: string;

    /**
     * The text to use for the button the end user can press in order to ignore an optional update that is available. Defaults to "Ignore".
     */
    optionalIgnoreButtonLabel?: string;

    /**
     * The text to use for the button the end user can press in order to install an optional update. Defaults to "Install".
     */
    optionalInstallButtonLabel?: string;

    /**
     * The text used as the body of an update notification, when the update is optional. Defaults to "An update is available. Would you like to install it?".
     */
    optionalUpdateMessage?: string;

    /**
     * The text used as the header of an update notification that is displayed to the end user. Defaults to "Update available".
     */
    title?: string;
}

export type DownloadProgressCallback = (progress: DownloadProgress) => void;
export type SyncStatusChangedCallback = (status: SyncStatus) => void;
export type HandleBinaryVersionMismatchCallback = (update: NativeUpdateNotification) => void;

export interface DownloadProgress {
    /**
     * The total number of bytes expected to be received for this update.
     */
    totalBytes: number;

    /**
     * The number of bytes downloaded thus far.
     */
    receivedBytes: number;
}

export interface LocalPackage extends Package {
    /**
     * Installs the update by saving it to the location on disk where the runtime expects to find the latest version of the app.
     *
     * @param installMode Indicates when you would like the update changes to take effect for the end-user.
     * @param minimumBackgroundDuration For resume-based installs, this specifies the number of seconds the app needs to be in the background before forcing a restart. Defaults to 0 if unspecified.
     * @param onUpdateInstalled An optional promise called after app installation
     */
    install(installMode?: InstallMode, minimumBackgroundDuration?: number, onUpdateInstalled?: () => (Promise<void> | void)): Promise<void>;
}

export interface Package {
    /**
     * The app binary version that this update is dependent on. This is the value that was
     * specified via the appStoreVersion parameter when calling the CLI's release command.
     */
    appVersion: string;

    /**
     * The release channel public ID that was used to originally download this update.
     */
    releaseChannelPublicId: string;

    /**
     * The description of the update. This is the same value that you specified in the CLI when you released the update.
     */
    description: string;

    /**
     * Indicates whether this update has been previously installed but was rolled back.
     */
    failedInstall: boolean;

    /**
     * Indicates whether this is the first time the update has been run after being installed.
     */
    isFirstRun: boolean;

    /**
     * Indicates whether the update is considered mandatory. This is the value that was specified in the CLI when the update was released.
     */
    isMandatory: boolean;

    /**
     * Indicates whether this update is in a "pending" state. When true, that means the update has been downloaded and installed, but the app restart
     * needed to apply it hasn't occurred yet, and therefore, its changes aren't currently visible to the end-user.
     */
    isPending: boolean;

    /**
     * The internal label automatically given to the update by the CodePush server. This value uniquely identifies the update within its release channel.
     */
    label: string;

    /**
     * The SHA hash value of the update.
     */
    packageHash: string;

    /**
     * The size of the code contained within the update, in bytes.
     */
    packageSize: number;
}

export interface RemotePackage extends Package {
    /**
     * Downloads the available update from the CodePush service.
     *
     * @param downloadProgressCallback An optional callback that allows tracking the progress of the update while it is being downloaded.
     */
    download(downloadProgressCallback?: DownloadProgressCallback): Promise<LocalPackage>;

    /**
     * The URL at which the package is available for download.
     */
    downloadUrl: string;
}

export interface SyncOptions {
    /**
     * Specifies the release channel you want to query for an update against. By default, this value is derived from the Info.plist
     * file (iOS) and strings resources (Android), but this option allows you to override it from the script-side if you need to
     * dynamically use a different release channel for a specific call to sync.
     */
    releaseChannelPublicId?: string;

    /**
     * Specifies when you would like to install optional updates (i.e. those that aren't marked as mandatory).
     * Defaults to codePush.InstallMode.ON_NEXT_RESTART.
     */
    installMode?: InstallMode;

    /**
     * Specifies when you would like to install updates which are marked as mandatory.
     * Defaults to codePush.InstallMode.IMMEDIATE.
     */
    mandatoryInstallMode?: InstallMode;

    /**
     * Specifies the minimum number of seconds that the app needs to have been in the background before restarting the app. This property
     * only applies to updates which are installed using `InstallMode.ON_NEXT_RESUME` or `InstallMode.ON_NEXT_SUSPEND`, and can be useful
     * for getting your update in front of end users sooner, without being too obtrusive. Defaults to `0`, which has the effect of applying
     * the update immediately after a resume or unless the app suspension is long enough to not matter, regardless how long it was in the background.
     */
    minimumBackgroundDuration?: number;

    /**
     * An "options" object used to determine whether a confirmation dialog should be displayed to the end user when an update is available,
     * and if so, what strings to use. Defaults to null, which has the effect of disabling the dialog completely. Setting this to any truthy
     * value will enable the dialog with the default strings, and passing an object to this parameter allows enabling the dialog as well as
     * overriding one or more of the default strings.
     */
    updateDialog?: UpdateDialog | true;

    /**
     * The rollback retry mechanism allows the application to attempt to reinstall an update that was previously rolled back (with the restrictions
     * specified in the options). It is an "options" object used to determine whether a rollback retry should occur, and if so, what settings to use
     * for the rollback retry. This defaults to null, which has the effect of disabling the retry mechanism. Setting this to true will enable
     * the retry mechanism with the default settings, and passing an object to this parameter allows enabling the rollback retry as well as overriding
     * one or more of the default values.
     */
    rollbackRetryOptions?: RollbackRetryOptions | true;

    ignoreFailedUpdates?: boolean;
}

export interface RollbackRetryOptions {
    /**
     * Specifies the minimum time in hours that the app will wait after the latest rollback
     * before attempting to reinstall same rolled-back package. Defaults to `24`.
     */
    delayInHours?: number;

    /**
     * Specifies the maximum number of retry attempts that the app can make before it stops trying.
     * Cannot be less than `1`. Defaults to `1`.
     */
    maxRetryAttempts?: number;
}

export interface StatusReport {
    /**
     * Whether the deployment succeeded or failed.
     */
    status: DeploymentStatus;

    /**
     * The version of the app that was deployed (for a native app upgrade).
     */
    appVersion?: string;

    /**
     * Details of the package that was deployed (or attempted to).
     */
    package?: Package;

    /**
     * Release channel used when deploying the previous package.
     */
    previousReleaseChannelPublicId?: string;

    /**
     * The label (v#) of the package that was upgraded from.
     */
    previousLabelOrAppVersion?: string;
}
