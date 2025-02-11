[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / getUpdateMetadata

# Function: getUpdateMetadata()

> **getUpdateMetadata**(`updateState`?): `Promise`\<`null` \| [`LocalPackage`](../interfaces/LocalPackage.md)\>

Defined in: [getUpdateMetadata.ts:11](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/getUpdateMetadata.ts#L11)

Retrieves the metadata for an installed update (e.g. description, mandatory).

## Parameters

### updateState?

[`UpdateState`](../enumerations/UpdateState.md)

The state of the update you want to retrieve the metadata for. Defaults to UpdateState.RUNNING.

## Returns

`Promise`\<`null` \| [`LocalPackage`](../interfaces/LocalPackage.md)\>
