[**@appzung/react-native-code-push v10.1.0**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / CodePushOptions

# Interface: CodePushOptions

## Extends

- [`SyncOptions`](SyncOptions.md)

## Properties

### checkFrequency?

> `optional` **checkFrequency**: [`CheckFrequency`](../enumerations/CheckFrequency.md)

Specifies when you would like to synchronize updates with the CodePush server.

Defaults to CheckFrequency.ON_APP_START.

---

### ignoreFailedUpdates?

> `optional` **ignoreFailedUpdates**: `boolean`

#### Inherited from

[`SyncOptions`](SyncOptions.md).[`ignoreFailedUpdates`](SyncOptions.md#ignorefailedupdates)

---

### installMode?

> `optional` **installMode**: [`InstallMode`](../enumerations/InstallMode.md)

Specifies when you would like to install regular updates (i.e. those that aren't marked as mandatory).

Defaults to InstallMode.ON_NEXT_RESTART.

#### Inherited from

[`SyncOptions`](SyncOptions.md).[`installMode`](SyncOptions.md#installmode)

---

### mandatoryInstallMode?

> `optional` **mandatoryInstallMode**: [`InstallMode`](../enumerations/InstallMode.md)

Specifies when you would like to install updates which are marked as mandatory.

Defaults to InstallMode.IMMEDIATE.

#### Inherited from

[`SyncOptions`](SyncOptions.md).[`mandatoryInstallMode`](SyncOptions.md#mandatoryinstallmode)

---

### minimumBackgroundDuration?

> `optional` **minimumBackgroundDuration**: `number`

Specifies the minimum number of seconds that the app needs to have been in the background before restarting the app. This property
only applies to updates which are installed using `InstallMode.ON_NEXT_RESUME` or `InstallMode.ON_NEXT_SUSPEND`, and can be useful
for getting your update in front of end users sooner, without being too obtrusive. Defaults to `0`, which has the effect of applying
the update immediately after a resume or unless the app suspension is long enough to not matter, regardless how long it was in the background.

#### Inherited from

[`SyncOptions`](SyncOptions.md).[`minimumBackgroundDuration`](SyncOptions.md#minimumbackgroundduration)

---

### releaseChannelPublicId?

> `optional` **releaseChannelPublicId**: `string`

Specifies the release channel you want to query for an update against.

By default, this value is derived from the Info.plist file (iOS) and strings resources (Android), but this option allows you to override it from the JS-side if you need to dynamically use a different release channel for a specific call to sync.

#### Inherited from

[`SyncOptions`](SyncOptions.md).[`releaseChannelPublicId`](SyncOptions.md#releasechannelpublicid)

---

### rollbackRetryOptions?

> `optional` **rollbackRetryOptions**: `true` \| [`RollbackRetryOptions`](RollbackRetryOptions.md)

The rollback retry mechanism allows the application to attempt to reinstall an update that was previously rolled back (with the restrictions specified in the options).

This defaults to null, which has the effect of disabling the retry mechanism.
Setting this to true will enable the retry mechanism with the default settings, and passing an object to this parameter allows enabling the rollback retry as well as overriding one or more of the default values.

#### Inherited from

[`SyncOptions`](SyncOptions.md).[`rollbackRetryOptions`](SyncOptions.md#rollbackretryoptions)

---

### updateDialog?

> `optional` **updateDialog**: `true` \| [`UpdateDialog`](UpdateDialog.md)

Used to determine whether a confirmation dialog should be displayed to the end user when an update is available, and if so, what strings to use.

Defaults to null, which has the effect of disabling the dialog completely.
Setting this to true will enable the dialog with the default strings, and passing an object to this parameter allows enabling the dialog as well as overriding one or more of the default strings.

#### Inherited from

[`SyncOptions`](SyncOptions.md).[`updateDialog`](SyncOptions.md#updatedialog)
