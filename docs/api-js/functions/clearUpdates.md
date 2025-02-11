[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / clearUpdates

# Function: clearUpdates()

> **clearUpdates**(): `void`

Defined in: [clearUpdates.ts:10](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/clearUpdates.ts#L10)

Clears all downloaded CodePush updates.

This is useful when switching to a different release channel which may have an older release than the current package.
Note: we don’t recommend using this method in scenarios other than that (CodePush will call
this method automatically when needed in other cases) as it could lead to unpredictable behavior.

## Returns

`void`
