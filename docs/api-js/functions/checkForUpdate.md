[**@appzung/react-native-code-push v11.0.0**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / checkForUpdate

# Function: checkForUpdate()

> **checkForUpdate**(`releaseChannelPublicId`?, `handleBinaryVersionMismatchCallback`?): `Promise`\<`null` \| [`RemotePackage`](../interfaces/RemotePackage.md)\>

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
