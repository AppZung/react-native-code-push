[**@appzung/react-native-code-push v10.2.0**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / SyncStatus

# Enumeration: SyncStatus

Indicates the current status of a sync operation.

## Enumeration Members

### AWAITING_USER_ACTION

> **AWAITING_USER_ACTION**: `6`

An update is available, and a confirmation dialog was shown
to the end user. (This is only applicable when the `updateDialog` is used)

---

### CHECKING_FOR_UPDATE

> **CHECKING_FOR_UPDATE**: `5`

The CodePush server is being queried for an update.

---

### DOWNLOADING_PACKAGE

> **DOWNLOADING_PACKAGE**: `7`

An available update is being downloaded from the CodePush server.

---

### INSTALLING_UPDATE

> **INSTALLING_UPDATE**: `8`

An available update was downloaded and is about to be installed.

---

### SYNC_IN_PROGRESS

> **SYNC_IN_PROGRESS**: `4`

There is an ongoing `sync` operation running which prevents the current call from being executed.

---

### UNKNOWN_ERROR

> **UNKNOWN_ERROR**: `3`

The `sync` operation encountered an unknown error.

---

### UP_TO_DATE

> **UP_TO_DATE**: `0`

The app is fully up-to-date with the configured release channel.

---

### UPDATE_IGNORED

> **UPDATE_IGNORED**: `2`

The app had an optional update which the end user chose to ignore.
(This is only applicable when the `updateDialog` is used)

---

### UPDATE_INSTALLED

> **UPDATE_INSTALLED**: `1`

An available update has been installed and will be run either immediately after the
`syncStatusChangedCallback` function returns or the next time the app resumes/restarts,
depending on the `InstallMode` specified in `SyncOptions`
