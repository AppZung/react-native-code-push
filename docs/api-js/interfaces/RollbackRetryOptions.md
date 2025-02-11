[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / RollbackRetryOptions

# Interface: RollbackRetryOptions

Defined in: [types.ts:239](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L239)

## Properties

### delayInHours?

> `optional` **delayInHours**: `number`

Defined in: [types.ts:245](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L245)

Specifies the minimum time in hours that the app will wait after the latest rollback before attempting to reinstall same rolled-back package.

Defaults to `24`.

---

### maxRetryAttempts?

> `optional` **maxRetryAttempts**: `number`

Defined in: [types.ts:253](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/types.ts#L253)

Specifies the maximum number of retry attempts that the app can make before it stops trying.
Cannot be less than `1`.

Defaults to `1`.
