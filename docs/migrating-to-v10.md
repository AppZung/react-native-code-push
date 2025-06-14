## Migration steps to @appzung/react-native-code-push v10+

If you are less in a hurry, you can migrate to `@appzung/react-native-code-push` v10+ where we will add new features in the future and actively support the module.

### Switch to @appzung/react-native-code-push npm package

1. Replace `react-native-code-push` in your package.json with `@appzung/react-native-code-push`: `@appzung/react-native-code-push: "^10.0.0"`
2. Run `npm install` (or `yarn` depending on your project)

### Change your JS code

1. Replace every `react-native-code-push` imports with `@appzung/react-native-code-push` imports
2. (optional) As the package is now compatible with ESM, if you call CodePush functions like `CodePush.sync()` or import types/interfaces, you may have to replace your imports `import CodePush from` to selective imports `import withCodePush, { sync, DownloadProgress } from` (or `import * as CodePush from`)
3. (optional) If you use a jest global mock, move the mock from `__mocks__/react-native-code-push.ts` to `__mocks__/@appzung/react-native-code-push.ts`
4. (optional) If you use dynamic deployment assignation, rename `deploymentKey` option to `releaseChannelPublicId` (TypeScript should catch that)

### Change your iOS setup

1. Run `bundle exec pod install`
2. Rename `CodePushDeploymentKey` to `CodePushReleaseChannelPublicId` in your `Info.plist`
3. (optional) If you already use code signing, rename `CodePushPublicKey` to `CodePushSigningPublicKey` in your `Info.plist`

### Change your Android setup

1. In `android/settings.gradle` remove the lines about CodePush : `include ':react-native-code-push'` and `project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')` (keep `include ':app'`)
2. In `android/app/build.gradle` change the line about CodePush: `apply from: "../../node_modules/@appzung/react-native-code-push/android/codepush.gradle"`
3. In your Android files (eg. `MainApplication.kt`), rename every `com.microsoft.codepush` prefix imports with `com.appzung.codepush`
4. Rename `CodePushDeploymentKey` to `CodePushReleaseChannelPublicId` in your strings resources (located either at strings.xml or app/build.gradle).
5. (optional) If you already use code signing, rename `CodePushPublicKey` to `CodePushSigningPublicKey` in your strings resources
6. (optional) If you used `CodePushBuilder` to instantiate CodePush manually, it has been removed, consider using the standard way or contact us if you really need this
7. (optional) If you used a custom CodePush `packageInstance` in your `react-native.config.js` file, it is no longer possible, consider using the standard way or contact us if you really need this
