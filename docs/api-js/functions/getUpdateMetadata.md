[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / getUpdateMetadata

# Function: getUpdateMetadata()

> **getUpdateMetadata**(`updateState`?): `Promise`\<`null` \| [`LocalPackage`](../interfaces/LocalPackage.md)\>

Defined in: [getUpdateMetadata.ts:11](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/getUpdateMetadata.ts#L11)

Retrieves the metadata for an installed update (e.g. description, mandatory).

## Parameters

### updateState?

[`UpdateState`](../enumerations/UpdateState.md)

The state of the update you want to retrieve the metadata for. Defaults to UpdateState.RUNNING.

## Returns

`Promise`\<`null` \| [`LocalPackage`](../interfaces/LocalPackage.md)\>
