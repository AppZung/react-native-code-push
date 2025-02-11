[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / StatusReport

# Interface: StatusReport

Defined in: [types.ts:256](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L256)

## Properties

### appVersion?

> `optional` **appVersion**: `string`

Defined in: [types.ts:265](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L265)

The version of the app that was deployed (for a native app upgrade).

---

### package?

> `optional` **package**: [`Package`](Package.md)

Defined in: [types.ts:270](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L270)

Details of the package that was deployed (or attempted to).

---

### previousLabelOrAppVersion?

> `optional` **previousLabelOrAppVersion**: `string`

Defined in: [types.ts:280](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L280)

The label (v#) of the package that was upgraded from.

---

### previousReleaseChannelPublicId?

> `optional` **previousReleaseChannelPublicId**: `string`

Defined in: [types.ts:275](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L275)

Release channel used when deploying the previous package.

---

### status

> **status**: [`DeploymentStatus`](../enumerations/DeploymentStatus.md)

Defined in: [types.ts:260](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/types.ts#L260)

Whether the deployment succeeded or failed.
