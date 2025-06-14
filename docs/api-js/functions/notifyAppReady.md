[**@appzung/react-native-code-push v10.2.4**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / notifyAppReady

# Function: notifyAppReady()

> **notifyAppReady**(): `Promise`\<`void` \| [`StatusReport`](../interfaces/StatusReport.md)\>

Notifies the CodePush runtime that an installed update is considered successful.

If you are manually checking for and installing updates (i.e. not using the `sync` method to handle it all for you), then this method **MUST** be called; otherwise CodePush will treat the update as failed and rollback to the previous version when the app next restarts.

## Returns

`Promise`\<`void` \| [`StatusReport`](../interfaces/StatusReport.md)\>
