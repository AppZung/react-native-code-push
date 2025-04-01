[**@appzung/react-native-code-push v11.0.0-rc6**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / InstallMode

# Enumeration: InstallMode

Indicates when you would like an installed update to actually be applied.

## Enumeration Members

### IMMEDIATE

> **IMMEDIATE**: `number`

Indicates that you want to install the update and restart the app immediately.

This value is appropriate for debugging scenarios as well as when displaying an update prompt to the user, since they would expect to see the changes immediately after accepting the installation. Additionally, this mode can be used to enforce mandatory updates, since it removes the potentially undesired latency between the update installation and the next time the end user restarts or resumes the app.

---

### ON_NEXT_RESTART

> **ON_NEXT_RESTART**: `number`

Indicates that you want to install the update, but not forcibly restart the app.

When the app is "naturally" restarted (due the OS or end user killing it), the update will be seamlessly picked up. This value is appropriate when performing silent updates, since it would likely be disruptive to the end user if the app suddenly restarted out of nowhere, since they wouldn't have realized an update was even downloaded. This is the default mode used for both the `sync` and `LocalPackage.install` methods.

---

### ON_NEXT_RESUME

> **ON_NEXT_RESUME**: `number`

Indicates that you want to install the update, but don't want to restart the app until the next time the end user resumes it from the background.

This way, you don't disrupt their current session,but you can get the update in front of them sooner than having to wait for the next natural restart.
This value is appropriate for silent installs that can be applied on resume in a non-invasive way.

---

### ON_NEXT_SUSPEND

> **ON_NEXT_SUSPEND**: `number`

Indicates that you want to install the update when the app is in the background,
but only after it has been in the background for "minimumBackgroundDuration" seconds (0 by default),
so that user context isn't lost unless the app suspension is long enough to not matter.
