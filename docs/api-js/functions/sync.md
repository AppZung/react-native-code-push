[**@appzung/react-native-code-push v10.2.3**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / sync

# Function: sync()

> **sync**(`options`?, `syncStatusChangedCallback`?, `downloadProgressCallback`?, `handleBinaryVersionMismatchCallback`?): `Promise`\<[`SyncStatus`](../enumerations/SyncStatus.md)\>

Allows checking for an update, downloading it and installing it, all with a single call.

Unless you need custom UI and/or behavior, we recommend most developers to use this method when integrating CodePush into their apps, if they are not using the `withCodePush` HOC.

## Parameters

### options?

[`SyncOptions`](../interfaces/SyncOptions.md)

Options used to configure the end-user update experience (e.g. show a prompt?, install the update immediately?).

### syncStatusChangedCallback?

[`SyncStatusChangedCallback`](../type-aliases/SyncStatusChangedCallback.md)

An optional callback that allows tracking the status of the sync operation, as opposed to simply checking the resolved state via the returned Promise.

### downloadProgressCallback?

[`DownloadProgressCallback`](../type-aliases/DownloadProgressCallback.md)

An optional callback that allows tracking the progress of an update while it is being downloaded.

### handleBinaryVersionMismatchCallback?

[`HandleBinaryVersionMismatchCallback`](../type-aliases/HandleBinaryVersionMismatchCallback.md)

An optional callback for handling target binary version mismatch

## Returns

`Promise`\<[`SyncStatus`](../enumerations/SyncStatus.md)\>
