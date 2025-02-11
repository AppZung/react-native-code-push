[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / LocalPackage

# Interface: LocalPackage

Defined in: [types.ts:98](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L98)

Represents a downloaded update that is either already running, or has been installed and is pending an app restart.

## Extends

- [`Package`](Package.md)

## Properties

### appVersion

> **appVersion**: `string`

Defined in: [types.ts:118](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L118)

The app binary version that this update is dependent on. This is the value that was
specified via the --target-binary-version parameter when calling the CLI's release command.

#### Inherited from

[`Package`](Package.md).[`appVersion`](Package.md#appversion)

---

### description

> **description**: `string`

Defined in: [types.ts:128](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L128)

The description of the update. This is the same value that you specified in the CLI when you released the update.

#### Inherited from

[`Package`](Package.md).[`description`](Package.md#description)

---

### failedInstall

> **failedInstall**: `boolean`

Defined in: [types.ts:135](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L135)

Indicates whether this update has been previously installed but was rolled back.

The `sync` method will automatically ignore updates which have previously failed, so you only need to worry about this property if using `checkForUpdate`.

#### Inherited from

[`Package`](Package.md).[`failedInstall`](Package.md#failedinstall)

---

### isFirstRun

> **isFirstRun**: `boolean`

Defined in: [types.ts:142](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L142)

Indicates whether this is the first time the update has been run after being installed.

This is useful for determining whether you would like to show a "What's New?" UI to the end user after installing an update.

#### Inherited from

[`Package`](Package.md).[`isFirstRun`](Package.md#isfirstrun)

---

### isMandatory

> **isMandatory**: `boolean`

Defined in: [types.ts:147](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L147)

Indicates whether the update is considered mandatory. This is the value that was specified in the CLI when the update was released.

#### Inherited from

[`Package`](Package.md).[`isMandatory`](Package.md#ismandatory)

---

### isPending

> **isPending**: `boolean`

Defined in: [types.ts:153](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L153)

Indicates whether this update is in a "pending" state. When true, that means the update has been downloaded and installed, but the app restart
needed to apply it hasn't occurred yet, and therefore, its changes aren't currently visible to the end-user.

#### Inherited from

[`Package`](Package.md).[`isPending`](Package.md#ispending)

---

### label

> **label**: `string`

Defined in: [types.ts:158](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L158)

The internal label automatically given to the update by the CodePush server. This value uniquely identifies the update within its release channel.

#### Inherited from

[`Package`](Package.md).[`label`](Package.md#label)

---

### packageHash

> **packageHash**: `string`

Defined in: [types.ts:163](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L163)

The SHA hash value of the update.

#### Inherited from

[`Package`](Package.md).[`packageHash`](Package.md#packagehash)

---

### packageSize

> **packageSize**: `number`

Defined in: [types.ts:168](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L168)

The size of the code contained within the update, in bytes.

#### Inherited from

[`Package`](Package.md).[`packageSize`](Package.md#packagesize)

---

### releaseChannelPublicId

> **releaseChannelPublicId**: `string`

Defined in: [types.ts:123](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L123)

The release channel public ID that was used to originally download this update.

#### Inherited from

[`Package`](Package.md).[`releaseChannelPublicId`](Package.md#releasechannelpublicid)

## Methods

### install()

> **install**(`installMode`?, `minimumBackgroundDuration`?, `onUpdateInstalled`?): `Promise`\<`void`\>

Defined in: [types.ts:106](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L106)

Installs the update by saving it to the location on disk where the runtime expects to find the latest version of the app.

#### Parameters

##### installMode?

[`InstallMode`](../enumerations/InstallMode.md)

Indicates when you would like the update changes to take effect for the end-user.

##### minimumBackgroundDuration?

`number`

For resume-based installs, this specifies the number of seconds the app needs to be in the background before forcing a restart. Defaults to 0 if unspecified.

##### onUpdateInstalled?

() => `void` \| `Promise`\<`void`\>

An optional promise called after app installation

#### Returns

`Promise`\<`void`\>
