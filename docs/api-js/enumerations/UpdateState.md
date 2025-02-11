[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / UpdateState

# Enumeration: UpdateState

Defined in: [enums/UpdateState.enum.ts:6](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/UpdateState.enum.ts#L6)

Indicates the state that an update is currently in.

## Enumeration Members

### LATEST

> **LATEST**: `number`

Defined in: [enums/UpdateState.enum.ts:24](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/UpdateState.enum.ts#L24)

Indicates than an update represents the latest available release, and can be either currently running or pending.

---

### PENDING

> **PENDING**: `number`

Defined in: [enums/UpdateState.enum.ts:19](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/UpdateState.enum.ts#L19)

Indicates than an update has been installed, but the app hasn't been restarted yet in order to apply it.

This can be useful for determining whether there is a pending update, which you may want to force a programmatic restart (via `restartApp`) in order to apply.

---

### RUNNING

> **RUNNING**: `number`

Defined in: [enums/UpdateState.enum.ts:12](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/enums/UpdateState.enum.ts#L12)

Indicates that an update represents the version of the app that is currently running.

This can be useful for identifying attributes about the app, for scenarios such as displaying the release description in a "what's new?" dialog or reporting the latest version to an analytics and/or crash reporting service.
