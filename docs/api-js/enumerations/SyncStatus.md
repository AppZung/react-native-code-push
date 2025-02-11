[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / SyncStatus

# Enumeration: SyncStatus

Defined in: [enums/SyncStatus.enum.ts:4](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L4)

Indicates the current status of a sync operation.

## Enumeration Members

### AWAITING_USER_ACTION

> **AWAITING_USER_ACTION**: `6`

Defined in: [enums/SyncStatus.enum.ts:42](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L42)

An update is available, and a confirmation dialog was shown
to the end user. (This is only applicable when the `updateDialog` is used)

---

### CHECKING_FOR_UPDATE

> **CHECKING_FOR_UPDATE**: `5`

Defined in: [enums/SyncStatus.enum.ts:36](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L36)

The CodePush server is being queried for an update.

---

### DOWNLOADING_PACKAGE

> **DOWNLOADING_PACKAGE**: `7`

Defined in: [enums/SyncStatus.enum.ts:47](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L47)

An available update is being downloaded from the CodePush server.

---

### INSTALLING_UPDATE

> **INSTALLING_UPDATE**: `8`

Defined in: [enums/SyncStatus.enum.ts:52](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L52)

An available update was downloaded and is about to be installed.

---

### SYNC_IN_PROGRESS

> **SYNC_IN_PROGRESS**: `4`

Defined in: [enums/SyncStatus.enum.ts:31](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L31)

There is an ongoing `sync` operation running which prevents the current call from being executed.

---

### UNKNOWN_ERROR

> **UNKNOWN_ERROR**: `3`

Defined in: [enums/SyncStatus.enum.ts:26](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L26)

The `sync` operation encountered an unknown error.

---

### UP_TO_DATE

> **UP_TO_DATE**: `0`

Defined in: [enums/SyncStatus.enum.ts:8](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L8)

The app is fully up-to-date with the configured release channel.

---

### UPDATE_IGNORED

> **UPDATE_IGNORED**: `2`

Defined in: [enums/SyncStatus.enum.ts:21](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L21)

The app had an optional update which the end user chose to ignore.
(This is only applicable when the `updateDialog` is used)

---

### UPDATE_INSTALLED

> **UPDATE_INSTALLED**: `1`

Defined in: [enums/SyncStatus.enum.ts:15](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/SyncStatus.enum.ts#L15)

An available update has been installed and will be run either immediately after the
`syncStatusChangedCallback` function returns or the next time the app resumes/restarts,
depending on the `InstallMode` specified in `SyncOptions`
