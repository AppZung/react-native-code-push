/**
 * Indicates the current status of a sync operation.
 */
export enum SyncStatus {
  /**
   * The app is up-to-date with the CodePush server.
   */
  UP_TO_DATE,

  /**
   * An available update has been installed and will be run either immediately after the
   * syncStatusChangedCallback function returns or the next time the app resumes/restarts,
   * depending on the InstallMode specified in SyncOptions
   */
  UPDATE_INSTALLED,

  /**
   * The app had an optional update which the end user chose to ignore.
   * (This is only applicable when the updateDialog is used)
   */
  UPDATE_IGNORED,

  /**
   * The sync operation encountered an unknown error.
   */
  UNKNOWN_ERROR,

  /**
   * There is an ongoing sync operation running which prevents the current call from being executed.
   */
  SYNC_IN_PROGRESS,

  /**
   * The CodePush server is being queried for an update.
   */
  CHECKING_FOR_UPDATE,

  /**
   * An update is available, and a confirmation dialog was shown
   * to the end user. (This is only applicable when the updateDialog is used)
   */
  AWAITING_USER_ACTION,

  /**
   * An available update is being downloaded from the CodePush server.
   */
  DOWNLOADING_PACKAGE,

  /**
   * An available update was downloaded and is about to be installed.
   */
  INSTALLING_UPDATE,
}
