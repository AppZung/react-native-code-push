[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / RemotePackage

# Interface: RemotePackage

Defined in: [types.ts:174](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L174)

Represents an available update on the CodePush server that hasn't been downloaded yet.

## Extends

- [`Package`](Package.md)

## Properties

### appVersion

> **appVersion**: `string`

Defined in: [types.ts:118](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L118)

The app binary version that this update is dependent on. This is the value that was
specified via the --target-binary-version parameter when calling the CLI's release command.

#### Inherited from

[`Package`](Package.md).[`appVersion`](Package.md#appversion)

---

### description

> **description**: `string`

Defined in: [types.ts:128](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L128)

The description of the update. This is the same value that you specified in the CLI when you released the update.

#### Inherited from

[`Package`](Package.md).[`description`](Package.md#description)

---

### downloadUrl

> **downloadUrl**: `string`

Defined in: [types.ts:187](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L187)

The URL at which the package is available for download.

This property is only needed for advanced usage, since the `download` method will automatically handle the acquisition of updates for you.

---

### failedInstall

> **failedInstall**: `boolean`

Defined in: [types.ts:135](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L135)

Indicates whether this update has been previously installed but was rolled back.

The `sync` method will automatically ignore updates which have previously failed, so you only need to worry about this property if using `checkForUpdate`.

#### Inherited from

[`Package`](Package.md).[`failedInstall`](Package.md#failedinstall)

---

### isFirstRun

> **isFirstRun**: `boolean`

Defined in: [types.ts:142](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L142)

Indicates whether this is the first time the update has been run after being installed.

This is useful for determining whether you would like to show a "What's New?" UI to the end user after installing an update.

#### Inherited from

[`Package`](Package.md).[`isFirstRun`](Package.md#isfirstrun)

---

### isMandatory

> **isMandatory**: `boolean`

Defined in: [types.ts:147](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L147)

Indicates whether the update is considered mandatory. This is the value that was specified in the CLI when the update was released.

#### Inherited from

[`Package`](Package.md).[`isMandatory`](Package.md#ismandatory)

---

### isPending

> **isPending**: `boolean`

Defined in: [types.ts:153](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L153)

Indicates whether this update is in a "pending" state. When true, that means the update has been downloaded and installed, but the app restart
needed to apply it hasn't occurred yet, and therefore, its changes aren't currently visible to the end-user.

#### Inherited from

[`Package`](Package.md).[`isPending`](Package.md#ispending)

---

### label

> **label**: `string`

Defined in: [types.ts:158](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L158)

The internal label automatically given to the update by the CodePush server. This value uniquely identifies the update within its release channel.

#### Inherited from

[`Package`](Package.md).[`label`](Package.md#label)

---

### packageHash

> **packageHash**: `string`

Defined in: [types.ts:163](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L163)

The SHA hash value of the update.

#### Inherited from

[`Package`](Package.md).[`packageHash`](Package.md#packagehash)

---

### packageSize

> **packageSize**: `number`

Defined in: [types.ts:168](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L168)

The size of the code contained within the update, in bytes.

#### Inherited from

[`Package`](Package.md).[`packageSize`](Package.md#packagesize)

---

### releaseChannelPublicId

> **releaseChannelPublicId**: `string`

Defined in: [types.ts:123](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L123)

The release channel public ID that was used to originally download this update.

#### Inherited from

[`Package`](Package.md).[`releaseChannelPublicId`](Package.md#releasechannelpublicid)

## Methods

### download()

> **download**(`downloadProgressCallback`?): `Promise`\<[`LocalPackage`](LocalPackage.md)\>

Defined in: [types.ts:180](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L180)

Downloads the available update from the CodePush service.

#### Parameters

##### downloadProgressCallback?

[`DownloadProgressCallback`](../type-aliases/DownloadProgressCallback.md)

An optional callback that allows tracking the progress of the update while it is being downloaded.

#### Returns

`Promise`\<[`LocalPackage`](LocalPackage.md)\>
