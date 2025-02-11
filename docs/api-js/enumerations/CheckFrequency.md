[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / CheckFrequency

# Enumeration: CheckFrequency

Defined in: [enums/CheckFrequency.enum.ts:4](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/enums/CheckFrequency.enum.ts#L4)

Indicates when you would like to check for (and install) updates from the CodePush server.

## Enumeration Members

### MANUAL

> **MANUAL**: `2`

Defined in: [enums/CheckFrequency.enum.ts:18](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/enums/CheckFrequency.enum.ts#L18)

Don't automatically check for updates, but only do it when `sync()` is manually called in app code.

---

### ON_APP_RESUME

> **ON_APP_RESUME**: `1`

Defined in: [enums/CheckFrequency.enum.ts:13](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/enums/CheckFrequency.enum.ts#L13)

When the app re-enters the foreground after being "backgrounded" (user pressed the home button, app launches a separate payment process, etc.)

---

### ON_APP_START

> **ON_APP_START**: `0`

Defined in: [enums/CheckFrequency.enum.ts:8](https://github.com/AppZung/react-native-code-push/blob/c18933fc82ce614eded3156d1f391ab8a21d21d7/src/enums/CheckFrequency.enum.ts#L8)

When the app is fully initialized (or more specifically, when the root component is mounted).
