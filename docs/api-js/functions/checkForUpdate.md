[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / checkForUpdate

# Function: checkForUpdate()

> **checkForUpdate**(`releaseChannelPublicId`?, `handleBinaryVersionMismatchCallback`?): `Promise`\<`null` \| [`RemotePackage`](../interfaces/RemotePackage.md)\>

Defined in: [checkForUpdates.ts:18](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/checkForUpdates.ts#L18)

Asks the CodePush service whether the configured app release channel has an update available.

## Parameters

### releaseChannelPublicId?

`string`

The release channel public ID to use to query the CodePush server for an update.

### handleBinaryVersionMismatchCallback?

[`HandleBinaryVersionMismatchCallback`](../type-aliases/HandleBinaryVersionMismatchCallback.md)

An optional callback for handling target binary version mismatch

## Returns

`Promise`\<`null` \| [`RemotePackage`](../interfaces/RemotePackage.md)\>
