[**@appzung/react-native-code-push v11.0.0-rc9**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / Package

# Interface: Package

## Extended by

- [`LocalPackage`](LocalPackage.md)
- [`RemotePackage`](RemotePackage.md)

## Properties

### appVersion

> **appVersion**: `string`

The app binary version that this update is dependent on. This is the value that was
specified via the --target-binary-version parameter when calling the CLI's release command.

---

### description

> **description**: `string`

The description of the update. This is the same value that you specified in the CLI when you released the update.

---

### failedInstall

> **failedInstall**: `boolean`

Indicates whether this update has been previously installed but was rolled back.

The `sync` method will automatically ignore updates which have previously failed, so you only need to worry about this property if using `checkForUpdate`.

---

### isFirstRun

> **isFirstRun**: `boolean`

Indicates whether this is the first time the update has been run after being installed.

This is useful for determining whether you would like to show a "What's New?" UI to the end user after installing an update.

---

### isMandatory

> **isMandatory**: `boolean`

Indicates whether the update is considered mandatory. This is the value that was specified in the CLI when the update was released.

---

### isPending

> **isPending**: `boolean`

Indicates whether this update is in a "pending" state. When true, that means the update has been downloaded and installed, but the app restart
needed to apply it hasn't occurred yet, and therefore, its changes aren't currently visible to the end-user.

---

### label

> **label**: `string`

The internal label automatically given to the update by the CodePush server. This value uniquely identifies the update within its release channel.

---

### packageHash

> **packageHash**: `string`

The SHA hash value of the update.

---

### packageSize

> **packageSize**: `number`

The size of the code contained within the update, in bytes.

---

### releaseChannelPublicId

> **releaseChannelPublicId**: `string`

The release channel public ID that was used to originally download this update.
