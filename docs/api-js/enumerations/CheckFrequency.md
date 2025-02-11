[**@appzung/react-native-code-push v10.1.0**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / CheckFrequency

# Enumeration: CheckFrequency

Indicates when you would like to check for (and install) updates from the CodePush server.

## Enumeration Members

### MANUAL

> **MANUAL**: `2`

Don't automatically check for updates, but only do it when `sync()` is manually called in app code.

---

### ON_APP_RESUME

> **ON_APP_RESUME**: `1`

When the app re-enters the foreground after being "backgrounded" (user pressed the home button, app launches a separate payment process, etc.)

---

### ON_APP_START

> **ON_APP_START**: `0`

When the app is fully initialized (or more specifically, when the root component is mounted).
