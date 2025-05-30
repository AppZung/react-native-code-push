[**@appzung/react-native-code-push v11.0.0-rc8**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / withCodePush

# Function: withCodePush()

## Call Signature

> **withCodePush**\<`P`\>(`component`): `ComponentType`

Wraps a React component inside a "higher order" React component that knows how to synchronize your app's JavaScript bundle and image assets when it is mounted.

Internally, the higher-order component calls `sync` inside its `componentDidMount` lifecycle handle, which in turns performs an update check, downloads the update if it exists and installs the update for you.

### Type Parameters

#### P

`P` _extends_ `object` \| `Record`\<`string`, `unknown`\>

### Parameters

#### component

`ComponentType`\<`P`\>

the React Component that will be decorated

### Returns

`ComponentType`

## Call Signature

> **withCodePush**\<`P`\>(`options`): (`component`) => `ComponentType`

Wraps a React component inside a "higher order" React component that knows how to synchronize your app's JavaScript bundle and image assets when it is mounted.

Internally, the higher-order component calls `sync` inside its `componentDidMount` lifecycle handle, which in turns performs an update check, downloads the update if it exists and installs the update for you.

### Type Parameters

#### P

`P` _extends_ `object` \| `Record`\<`string`, `unknown`\>

### Parameters

#### options

[`CodePushOptions`](../interfaces/CodePushOptions.md)

Options used to configure the end-user sync and update experience (e.g. when to check for updates?, show a prompt?, install the update immediately?).

### Returns

`Function`

#### Parameters

##### component

`ComponentType`\<`P`\>

#### Returns

`ComponentType`
