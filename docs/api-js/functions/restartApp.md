[**@appzung/react-native-code-push v11.0.0-rc3**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / restartApp

# Function: restartApp()

> **restartApp**(`onlyIfUpdateIsPending`): `Promise`\<`void`\>

Immediately restarts the app.

If there is an update pending, it will be immediately displayed to the end user. Otherwise, calling this method simply has the same behavior as the end user killing and restarting the process.

## Parameters

### onlyIfUpdateIsPending

`boolean` = `false`

Indicates whether you want the restart to no-op if there isn't currently a pending update.

## Returns

`Promise`\<`void`\>
