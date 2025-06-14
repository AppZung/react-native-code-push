[**@appzung/react-native-code-push v10.2.4**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / UpdateDialog

# Interface: UpdateDialog

## Properties

### appendReleaseDescription?

> `optional` **appendReleaseDescription**: `boolean`

Indicates whether you would like to append the description of an available release to the
notification message which is displayed to the end user.

Defaults to false.

---

### descriptionPrefix?

> `optional` **descriptionPrefix**: `string`

Indicates the string you would like to prefix the release description with, if any, when
displaying the update notification to the end user.

Defaults to " Description: "

---

### mandatoryContinueButtonLabel?

> `optional` **mandatoryContinueButtonLabel**: `string`

The text to use for the button the end user must press in order to install a mandatory update.

Defaults to "Continue".

---

### mandatoryUpdateMessage?

> `optional` **mandatoryUpdateMessage**: `string`

The text used as the body of an update notification, when the update is specified as mandatory.

Defaults to "An update is available that must be installed.".

---

### optionalIgnoreButtonLabel?

> `optional` **optionalIgnoreButtonLabel**: `string`

The text to use for the button the end user can press in order to ignore an optional update that is available.

Defaults to "Ignore".

---

### optionalInstallButtonLabel?

> `optional` **optionalInstallButtonLabel**: `string`

The text to use for the button the end user can press in order to install an optional update.

Defaults to "Install".

---

### optionalUpdateMessage?

> `optional` **optionalUpdateMessage**: `string`

The text used as the body of an update notification, when the update is optional.

Defaults to "An update is available. Would you like to install it?".

---

### title?

> `optional` **title**: `string`

The text used as the header of an update notification that is displayed to the end user.

Defaults to "Update available".
