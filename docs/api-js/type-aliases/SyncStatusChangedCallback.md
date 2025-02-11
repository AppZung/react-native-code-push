[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / SyncStatusChangedCallback

# Type Alias: SyncStatusChangedCallback()

> **SyncStatusChangedCallback**: (`status`) => `void`

Defined in: [types.ts:76](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L76)

Called when the sync process moves from one stage to another in the overall update process.

The method is called with a status code which represents the current state, and can be any of the `SyncStatus` values.

## Parameters

### status

[`SyncStatus`](../enumerations/SyncStatus.md)

## Returns

`void`
