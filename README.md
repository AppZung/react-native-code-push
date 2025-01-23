# React Native Module for AppZung CodePush

* [AppZung](#appzung)
* [How does it work?](#how-does-it-work)
* [Getting started](#getting-started)
  * [iOS Setup](docs/setup-ios.md)
  * [Android Setup](docs/setup-android.md)
  * [Windows Setup](docs/setup-windows.md)
  * [Code signing](docs/code-signing.md)
* [Migrating to AppZung CodePush](#migrating-to-appzung-codepush)
* [Compatibility table](#compatibility-table)
* [Usage](#usage)
  * [Advanced usage](./docs/advanced-usage.md)
* [Releasing updates](#releasing-updates)
* [Store guidelines compliance](#store-guidelines-compliance)
* [API Reference](#api-reference)
* [Debugging / Troubleshooting](#debugging--troubleshooting)

## AppZung

AppZung is a robust solution for CodePush functionality, created in response to AppCenter's retirement.
CodePush allows you to easily add a dynamic update experience to your React Native app(s).

We will offer feature-parity with the original CodePush and introduce advanced capabilities in:

- Hosting
- Delivery
- Analytics
- Security
- Privacy

Currently, AppZung is used in production by several private clients, serving over 2M end-users.

AppZung may or may not expand the scope beyond CodePush features in the future.

It is not yet available publicly - Email hello@appzung.com to join the platform.

## How does it work?

A React Native app is composed of JavaScript files and any accompanying [images](https://reactnative.dev/docs/image), which are bundled together by the [metro bundler](https://github.com/facebook/metro) and distributed as part of a platform-specific binary (i.e. an `.ipa` or `.apk` file). Once the app is released, updating either the JavaScript code (e.g. making bug fixes, adding new features) or image assets, requires you to recompile and redistribute the entire binary, which of course, includes any review time associated with the store(s) you are publishing to.

The CodePush plugin helps get product improvements in front of your end users instantly, by keeping your JavaScript and images synchronized with updates you release to the CodePush server. This way, your app gets the benefits of an offline mobile experience, as well as the "web-like" agility of side-loading updates as soon as they are available. It's a win-win!

In order to ensure that your end users always have a functioning version of your app, the CodePush plugin maintains a copy of the previous update, so that in the event that you accidentally push an update which includes a crash, it can automatically roll back. This way, you can rest assured that your newfound release agility won't result in users becoming blocked before you have a chance to roll back on the server. It's a win-win-win!

*Note: Any product changes which touch native code (e.g. modifying your `AppDelegate.mm`/`MainActivity.kt` file, adding a new plugin, or changing an image or video not using `require()` syntax) cannot be distributed via CodePush, and therefore, must be updated via the appropriate store(s).*

## Getting started

If you are migrating from `react-native-code-push`, see below ["Migrating to AppZung CodePush"](#migrating-to-appzung-codepush).

```shell
npm install --save @appzung/react-native-code-push
```

*NOTE: For Expo apps a plugin will be made available soon. In the meantime, you may eject.*

Then continue with installing the native module:

* [iOS Setup](docs/setup-ios.md)
* [Android Setup](docs/setup-android.md)
* [Windows Setup](docs/setup-windows.md)

## Migrating to AppZung CodePush

This `@appzung/react-native-code-push` package aims to be a drop-in replacement for the `react-native-code-push` module from Microsoft. You may find the migration steps below.

This package will be updated with new features, that will only be available on `@appzung/react-native-code-push` v10+ (not the original `react-native-code-push` module).

This package is compatible with the new architecture on iOS (tested on 0.76) with the interop layer, but not yet on Android. We started some work, but we are not focusing on it right now since there is no demand from our private clients for the moment. Note that there is ongoing work by the community on the original `react-native-code-push` repository so we will be able to integrate this faster in case it gets finished.

Windows (UWP) won't be actively supported on v10+ except if there is demand for it (it will get stuck at the basic features of CodePush v9). Please contact hello@appzung.com to help us assess this demand. Thank you for your understanding.

We renamed "deployments" to "release channels" for better clarity between actual release deployments and their release channels.

### Migrating to AppZung CLI

1. Use the AppZung CLI (`@appzung/cli`) instead of AppCenter's. See `npx @appzung/cli@1 welcome` and `npx @appzung/cli@1 --help`
2. Migrate your apps from AppCenter automatically in order to retain most of your config (project hierarchy, release channels public ID = deployment key...) using `npx @appzung/cli@1 codepush migrate`
3. Change your deployment process with `npx @appzung/cli@1 releases deploy-react-native` (see section ["Releasing Updates"](#releasing-updates) below)

### Migration steps to @appzung/react-native-code-push v7,v8,v9 or below

If your app does not meet the requirements of the last version of Microsoft's `react-native-code-push` (iOS 15.5, React Native 0.71+), from which this module is based on, you may still use old versions of `react-native-code-push` and specify `CodePushServerUrl` to `https://codepush.appzung.com`, as our API is compatible with the original module's features.

You may also use the versions that we published based on the versions v5-v9 with minimal changes:

1. Replace the `react-native-code-push` version with `npm:@appzung/react-native-code-push@9.0.2` (or 8.3.2, 7.1.1, 6.4.2, 6.3.1, 5.7.1) eg. `"react-native-code-push": "npm:@appzung/react-native-code-push@^8.3.2",`
2. Run `npm install` (or `yarn` depending on your project)
3. Run `bundle exec pod install`
4. That's it! In these versions you keep the old nomenclature DeploymentKey (vs new ReleaseChannelPublicId).

### Migration steps to @appzung/react-native-code-push v10+

If you are less in a hurry, you can migrate to `@appzung/react-native-code-push` v10+ where we will add new features in the future and actively support the module.

#### Switch to @appzung/react-native-code-push npm package

1. Replace `react-native-code-push` in your package.json with `@appzung/react-native-code-push`: `@appzung/react-native-code-push: "^10.0.0"`
2. Run `npm install` (or `yarn` depending on your project)

#### Change your JS code

1. Replace every `react-native-code-push` imports with `@appzung/react-native-code-push` imports
2. (optional) If you use a jest global mock, move the mock from `__mocks__/react-native-code-push.ts` to  `__mocks__/@appzung/react-native-code-push.ts`
3. (optional) If you use dynamic deployment assignation, rename `deploymentKey` option to `releaseChannelPublicId` (TypeScript should catch that)

#### Change your iOS setup

1. Run `bundle exec pod install`
2. Rename `CodePushDeploymentKey` to `CodePushReleaseChannelPublicId` in your `Info.plist`
3. (optional) If you already use code signing, rename `CodePushPublicKey` to `CodePushSigningPublicKey` in your `Info.plist`

#### Change your Android setup

1. In `android/settings.gradle` change the lines about CodePush : `include ':appzung_react-native-code-push'` and `project(':appzung_react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/@appzung/react-native-code-push/android/app')`
2. In `android/app/build.gradle` change the line about CodePush: `apply from: "../../node_modules/@appzung/react-native-code-push/android/codepush.gradle"`
3. In your Android files (eg. `MainApplication.kt`), rename every `com.microsoft.codepush` prefix imports with `com.appzung.codepush`
4. Rename `CodePushDeploymentKey` to `CodePushReleaseChannelPublicId` in your strings resources (located either at strings.xml or app/build.gradle).
5. (optional) If you already use code signing, rename `CodePushPublicKey` to `CodePushSigningPublicKey` in your strings resources

## Compatibility table

We try our best to maintain backwards compatibility of our plugin with previous versions of React Native, but due to the nature of the platform, and the existence of breaking changes between releases, it is possible that you need to use a specific version of the CodePush plugin in order to support the exact version of React Native you are using. The following table outlines which CodePush plugin versions officially support the respective React Native versions:

| React Native version(s) | Android         | iOS  | Supporting CodePush version(s) |
|-------------------------|-----------------|------|--------------------------------|
| <0.59                   | -               | -    | **Unsupported**                |
| v0.59                   | 4.1+ (TLS 1.2+) | 7    | v5.7.1                         |
| v0.60-v0.61             | 4.1+ (TLS 1.2+) | 7    | v6.3.1                         |
| v0.62-v0.64             | 4.1+ (TLS 1.2+) | 7    | v6.4.2                         |
| v0.65-v0.70             | 4.1+ (TLS 1.2+) | 9    | v7.1.1                         |
| v0.71+                  | 4.1+ (TLS 1.2+) | 9    | v8.3.2                         |
| v0.71+                  | 4.1+ (TLS 1.2+) | 15.5 | v9.0.2 or v10+                 |

Our plugin will support new architecture but for the moment starting from 0.76 you will need to [opt out](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here#opt-out) from new architecture.

We work hard to respond to new RN releases, but they do occasionally break us. We will update this chart with each RN release, so that users can check to see what our "official" support is.

Windows (UWP) won't be actively supported on v10+ except if there is demand for it (it will get stuck at the basic features of CodePush v9). Please contact hello@appzung.com to help us assess this demand. Thank you for your understanding.

## Usage

With the CodePush plugin downloaded and linked, and your app asking CodePush where to get the right JS bundle from, the only thing left is to add the necessary code to your app to control the following policies:

1. When (and how often) to check for an update? (for example app start, in response to clicking a button in a settings page, periodically at some fixed interval)
2. When an update is available, how to present it to the end user?

The simplest way to do this is to "CodePush-ify" your app's root component:

```javascript
import codePush from "@appzung/react-native-code-push";

const MyApp = () => {
}

export default codePush(MyApp);
```

By default, and this is recommended for production environments, CodePush will check for updates on every app start. If an update is available, it will be silently downloaded, and installed the next time the app is restarted (either explicitly by the end user or by the OS), which ensures the least invasive experience for your end users. If an available update is mandatory, then it will be installed immediately, ensuring that the end user gets it as soon as possible.

If you would like your app to discover updates more quickly, you can also choose to sync up with the CodePush server every time the app resumes from the background.

```javascript
codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(MyApp);
```

Alternatively, if you want fine-grained control over when the check happens (like a button press or timer interval), eg. in a staging environment, you can call [`CodePush.sync()`](docs/api-js.md#codepushsync) at any time with your desired `SyncOptions`, and turn off CodePush's automatic checking by specifying a manual `checkFrequency`:

```javascript
import codePush from "@appzung/react-native-code-push";

class MyApp extends Component {
    onButtonPress() {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onButtonPress}>
                    <Text>Check for updates</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default codePush({ checkFrequency: codePush.CheckFrequency.MANUAL })(MyApp);
```

If you would like to display an update confirmation dialog (an "active install"), configure when an available update is installed (like force an immediate restart) or customize the update experience in any other way, refer to the [`codePush()`](docs/api-js.md#codepush) API reference for information on how to tweak this default behavior.

## Releasing updates

Once your app is configured and distributed to your users, and you have made some JS or asset changes, it's time to release them. The recommended way to release them is using the `appzung releases deploy-react-native` command in the AppZung CLI, which will bundle your JavaScript files, asset files, and release the update to the CodePush server.

### Locally

*NOTE: Before you can start releasing updates, please log into AppZung by running the `appzung auth login` command.*

In its most basic form, this command looks like this:

```shell
appzung releases deploy-react-native
```

The `appzung releases deploy-react-native` command enables such a simple workflow because it provides many sensible defaults (like generating a release bundle, assuming your app's entry file on iOS is either `index.ios.js` or `index.js`). However, all of these defaults can be customized to allow incremental flexibility as necessary, which makes it a good fit for most scenarios. Here are common use-cases:

```shell
# Release a mandatory update with a changelog from the last git commit (useful for staging releases)
appzung releases deploy-react-native -m --description-from-current-git-commit

# Force using hermes since auto-detection is not always possible. There is the equivalent --use-jsc to force using JSC engine.
appzung releases deploy-react-native --use-hermes

# Auto detecting the release version might not be a good strategy in a production app with multiple environments so you can specify the version
appzung releases deploy-react-native --target-binary-version "1.1.2"

# See other flags
appzung releases deploy-react-native --help
```

The CodePush client supports differential updates, so even though you are releasing your JS bundle and assets on every update, your end users will only actually download the files they need. The service handles this automatically so that you can focus on creating awesome apps and we can worry about optimizing end user downloads.

For more details about how the `appzung releases deploy-react-native` command works, as well as the various parameters it exposes, refer to the `appzung releases deploy-react-native --help` command. Additionally, if you would prefer to handle running the `react-native bundle` command yourself, and therefore, want an even more flexible solution than `appzung releases deploy-react-native`, refer to the `appzung releases deploy --help` command for more details.

If you run into any issues, or have any questions/comments/feedback, you can check out the [troubleshooting](#debugging--troubleshooting) details below or email us at support@appzung.com.

*NOTE: CodePush updates should be tested in modes other than Debug mode. In Debug mode, React Native app always downloads JS bundle generated by packager, so JS bundle downloaded by CodePush does not apply.*

### On CI

You would typically release updates in a CI though, so the command will need the release channel and a project secret API key that you previously create with `appzung projects api-keys create`.

```shell
appzung releases deploy-react-native --release-channel $APPZUNG_RELEASE_CHANNEL_ID_ANDROID --description-from-current-git-commit --use-hermes --disable-duplicate-release-error --api-key $APPZUNG_API_KEY
appzung releases deploy-react-native --release-channel $APPZUNG_RELEASE_CHANNEL_ID_IOS --description-from-current-git-commit --use-hermes --disable-duplicate-release-error --api-key $APPZUNG_API_KEY
```

We will publish a guide with best practices and workflows examples for GitHub Actions and Bitrise.

### Advanced usage

See the corresponding documentation file about [Advanced usage](./docs/advanced-usage.md).

## Store guidelines compliance

Android Google Play and iOS App Store have corresponding guidelines that have rules you should be aware of before integrating the CodePush solution within your application.

### Google play

Third paragraph of [Device and Network Abuse](https://support.google.com/googleplay/android-developer/answer/9888379?hl=en) topic describe that updating source code by any method other than Google Play's update mechanism is restricted. But this restriction does not apply to updating javascript bundles.
> This restriction does not apply to code that runs in a virtual machine and has limited access to Android APIs (such as JavaScript in a webview or browser).

That fully allow CodePush as it updates just JS bundles and can't update native code part.

### App Store

Paragraph **3.3.2**, since back in 2015's [Apple Developer Program License Agreement](https://developer.apple.com/programs/ios/information/) fully allowed performing over-the-air updates of JavaScript and assets -  and in its latest version (20170605) [downloadable here](https://developer.apple.com/terms/) this ruling is even broader:

> Interpreted code may be downloaded to an Application but only so long as such code: (a) does not change the primary purpose of the Application by providing features or functionality that are inconsistent with the intended and advertised purpose of the Application as submitted to the App Store, (b) does not create a store or storefront for other code or applications, and (c) does not bypass signing, sandbox, or other security features of the OS.

CodePush allows you to follow these rules in full compliance so long as the update you push does not significantly deviate your product from its original App Store approved intent.

To further remain in compliance with Apple's guidelines we suggest that App Store-distributed apps don't enable the `updateDialog` option when calling `sync`, since in the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) it is written that:

> Apps must not force users to rate the app, review the app, download other apps, or other similar actions in order to access functionality, content, or use of the app.

This is not necessarily the case for `updateDialog`, since it won't force the user to download the new version, but at least you should be aware of that ruling if you decide to show it.

## API Reference

* [JavaScript API](docs/api-js.md)
* [Objective-C API Reference (iOS)](docs/api-ios.md)
* [Java API Reference (Android)](docs/api-android.md)

## Debugging / Troubleshooting

The `sync` method includes a lot of diagnostic logging out-of-the-box, so if you're encountering an issue when using it, the best thing to try first is examining the output logs of your app. This will tell you whether the app is configured correctly (like can the plugin find your release channel public ID?), if the app is able to reach the server, if an available update is being discovered, if the update is being successfully downloaded/installed, etc. We want to continue improving the logging to be as intuitive/comprehensive as possible, so please [let us know](mailto:support@appzung.com) if you find it to be confusing or missing anything.

Start up the Chrome DevTools Console, the Xcode Console (iOS) and/or ADB logcat (Android), and look for messages which are prefixed with `[CodePush]`.

Note that by default, React Native logs are disabled on iOS in release builds, so if you want to view them in a release build, you need to make the following changes to your `AppDelegate.m` file:

1. Add an `#import <React/RCTLog.h>` statement

2. Add the following statement to the top of your `application:didFinishLaunchingWithOptions` method:

    ```objective-c
    RCTSetLogThreshold(RCTLogLevelInfo);
    ```

Now you'll be able to see CodePush logs in either debug or release mode, on both iOS or Android. If examining the logs don't provide an indication of the issue, please refer to the following common issues for additional resolution ideas:

| Issue / Symptom                                                                          | Possible Solution                                                                                                                                                                                                                                                                                                  |
|------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Compilation Error                                                                        | Double-check that your version of React Native is [compatible](#compatibility-table) with the CodePush version you are using.                                                                                                                                                                                      |
| Network timeout / hang when calling `sync` or `checkForUpdate` in the iOS Simulator      | Try resetting the simulator by selecting the `Simulator -> Reset Content and Settings..` menu item, and then re-running your app.                                                                                                                                                                                  |
| Server responds with a `404` when calling `sync` or `checkForUpdate`                     | Double-check that the release channel public ID you added to your `Info.plist` (iOS), `strings.xml` or `app/build.gradle` (Android) or that you're passing to `sync`/`checkForUpdate`, is in fact correct. You can run `appzung release-channels list` to view the correct public ID for your app release channel. |
| Update not being discovered                                                              | Double-check that the version of your running app (like `1.0.0`) matches the version you specified when releasing the update to CodePush. Additionally, make sure that you are releasing to the same release channel that your app is configured to sync with.                                                     |
| Update not being displayed after restart                                                 | If you're not calling `sync` on app start (like within `componentDidMount` of your root component), then you need to explicitly call `notifyApplicationReady` on app start, otherwise, the plugin will think your update failed and roll it back.                                                                  |
| I've released an update for iOS but my Android app also shows an update and it breaks it | Be sure you have different release channels for each platform in order to receive updates correctly                                                                                                                                                                                                                |
| I've released new update but changes are not reflected                                   | Be sure that you are running app in modes other than Debug. In Debug mode, React Native app always downloads JS bundle generated by packager, so JS bundle downloaded by CodePush does not apply.                                                                                                                  |
