[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / UpdateDialog

# Interface: UpdateDialog

Defined in: [types.ts:6](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L6)

## Properties

### appendReleaseDescription?

> `optional` **appendReleaseDescription**: `boolean`

Defined in: [types.ts:13](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L13)

Indicates whether you would like to append the description of an available release to the
notification message which is displayed to the end user.

Defaults to false.

---

### descriptionPrefix?

> `optional` **descriptionPrefix**: `string`

Defined in: [types.ts:21](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L21)

Indicates the string you would like to prefix the release description with, if any, when
displaying the update notification to the end user.

Defaults to " Description: "

---

### mandatoryContinueButtonLabel?

> `optional` **mandatoryContinueButtonLabel**: `string`

Defined in: [types.ts:28](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L28)

The text to use for the button the end user must press in order to install a mandatory update.

Defaults to "Continue".

---

### mandatoryUpdateMessage?

> `optional` **mandatoryUpdateMessage**: `string`

Defined in: [types.ts:35](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L35)

The text used as the body of an update notification, when the update is specified as mandatory.

Defaults to "An update is available that must be installed.".

---

### optionalIgnoreButtonLabel?

> `optional` **optionalIgnoreButtonLabel**: `string`

Defined in: [types.ts:42](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L42)

The text to use for the button the end user can press in order to ignore an optional update that is available.

Defaults to "Ignore".

---

### optionalInstallButtonLabel?

> `optional` **optionalInstallButtonLabel**: `string`

Defined in: [types.ts:49](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L49)

The text to use for the button the end user can press in order to install an optional update.

Defaults to "Install".

---

### optionalUpdateMessage?

> `optional` **optionalUpdateMessage**: `string`

Defined in: [types.ts:56](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L56)

The text used as the body of an update notification, when the update is optional.

Defaults to "An update is available. Would you like to install it?".

---

### title?

> `optional` **title**: `string`

Defined in: [types.ts:63](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L63)

The text used as the header of an update notification that is displayed to the end user.

Defaults to "Update available".
