[**@appzung/react-native-code-push v10.2.4**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / clearUpdates

# Function: clearUpdates()

> **clearUpdates**(): `void`

Clears all downloaded CodePush updates.

This is useful when switching to a different release channel which may have an older release than the current package.
Note: we don’t recommend using this method in scenarios other than that (CodePush will call
this method automatically when needed in other cases) as it could lead to unpredictable behavior.

## Returns

`void`
