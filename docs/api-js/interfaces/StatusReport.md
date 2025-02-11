[**@appzung/react-native-code-push v11.0.0-rc3**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / StatusReport

# Interface: StatusReport

## Properties

### appVersion?

> `optional` **appVersion**: `string`

The version of the app that was deployed (for a native app upgrade).

---

### package?

> `optional` **package**: [`Package`](Package.md)

Details of the package that was deployed (or attempted to).

---

### previousLabelOrAppVersion?

> `optional` **previousLabelOrAppVersion**: `string`

The label (v#) of the package that was upgraded from.

---

### previousReleaseChannelPublicId?

> `optional` **previousReleaseChannelPublicId**: `string`

Release channel used when deploying the previous package.

---

### status

> **status**: [`DeploymentStatus`](../enumerations/DeploymentStatus.md)

Whether the deployment succeeded or failed.
