[**@appzung/react-native-code-push v11.0.0-rc3**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / getUpdateMetadata

# Function: getUpdateMetadata()

> **getUpdateMetadata**(`updateState`?): `Promise`\<`null` \| [`LocalPackage`](../interfaces/LocalPackage.md)\>

Retrieves the metadata for an installed update (e.g. description, mandatory).

## Parameters

### updateState?

[`UpdateState`](../enumerations/UpdateState.md)

The state of the update you want to retrieve the metadata for. Defaults to UpdateState.RUNNING.

## Returns

`Promise`\<`null` \| [`LocalPackage`](../interfaces/LocalPackage.md)\>
