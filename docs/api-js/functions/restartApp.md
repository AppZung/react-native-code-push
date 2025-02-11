[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / restartApp

# Function: restartApp()

> **restartApp**(`onlyIfUpdateIsPending`): `Promise`\<`void`\>

Defined in: [restartApp.ts:10](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/restartApp.ts#L10)

Immediately restarts the app.

If there is an update pending, it will be immediately displayed to the end user. Otherwise, calling this method simply has the same behavior as the end user killing and restarting the process.

## Parameters

### onlyIfUpdateIsPending

`boolean` = `false`

Indicates whether you want the restart to no-op if there isn't currently a pending update.

## Returns

`Promise`\<`void`\>
