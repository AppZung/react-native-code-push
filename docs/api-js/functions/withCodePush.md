[**@appzung/react-native-code-push**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / withCodePush

# Function: withCodePush()

## Call Signature

> **withCodePush**(`component`): `FunctionComponent`

Defined in: [CodePush.tsx:31](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/CodePush.tsx#L31)

Wraps a React component inside a "higher order" React component that knows how to synchronize your app's JavaScript bundle and image assets when it is mounted.

Internally, the higher-order component calls `sync` inside its `componentDidMount` lifecycle handle, which in turns performs an update check, downloads the update if it exists and installs the update for you.

### Parameters

#### component

`any`

the React Component that will be decorated

### Returns

`FunctionComponent`

## Call Signature

> **withCodePush**(`options`): (`component`) => `FunctionComponent`

Defined in: [CodePush.tsx:40](https://github.com/AppZung/react-native-code-push/blob/5f900017beec34f1e037ac881585c7f5fb00d5dd/src/CodePush.tsx#L40)

Wraps a React component inside a "higher order" React component that knows how to synchronize your app's JavaScript bundle and image assets when it is mounted.

Internally, the higher-order component calls `sync` inside its `componentDidMount` lifecycle handle, which in turns performs an update check, downloads the update if it exists and installs the update for you.

### Parameters

#### options

[`CodePushOptions`](../interfaces/CodePushOptions.md)

Options used to configure the end-user sync and update experience (e.g. when to check for updates?, show a prompt?, install the update immediately?).

### Returns

`Function`

#### Parameters

##### component

`any`

#### Returns

`FunctionComponent`
