[**@appzung/react-native-code-push v10.2.3**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / RollbackRetryOptions

# Interface: RollbackRetryOptions

## Properties

### delayInHours?

> `optional` **delayInHours**: `number`

Specifies the minimum time in hours that the app will wait after the latest rollback before attempting to reinstall same rolled-back package.

Defaults to `24`.

---

### maxRetryAttempts?

> `optional` **maxRetryAttempts**: `number`

Specifies the maximum number of retry attempts that the app can make before it stops trying.
Cannot be less than `1`.

Defaults to `1`.
