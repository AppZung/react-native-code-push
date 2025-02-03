## iOS Setup

- [Plugin Installation and Configuration](#plugin-installation-and-configuration)

### Plugin Installation and Configuration

1. Run `cd ios && pod install && cd ..` to install all the necessary CocoaPods dependencies.

2. Open up the `AppDelegate.m`/`AppDelegate.swift` file, and add an import statement for the CodePush headers:

   ```objective-c
   #import <CodePush/CodePush.h>
   ```

   ```swift
   import CodePush
   ```

3. Find the following line of code, which sets the source URL for bridge for production releases:

   ```objective-c
   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
   ```

   ```swift
   Bundle.main.url(forResource: "main", withExtension: "jsbundle")
   ```

4. Replace it with this line:

   ```objective-c
   return [CodePush bundleURL];
   ```

   ```swift
   CodePush.bundleURL()
   ```

   This change configures your app to always load the most recent version of your app's JS bundle. On the first launch, this will correspond to the file that was compiled with the app. However, after an update has been pushed via CodePush, this will return the location of the most recently installed update.

   _NOTE: The `bundleURL` method assumes your app's JS bundle is named `main.jsbundle`. If you have configured your app to use a different file name, simply call the `bundleURLForResource:` method (which assumes you're using the `.jsbundle` extension) or `bundleURLForResource:withExtension:` method instead, in order to overwrite that default behavior_

   Typically, you're only going to want to use CodePush to resolve your JS bundle location within release builds, and therefore, we recommend using the `DEBUG` pre-processor macro to dynamically switch between using the packager server and CodePush, depending on whether you are debugging or not. This will make it much simpler to ensure you get the right behavior you want in production, while still being able to use the Chrome Dev Tools, live reload, etc. at debug-time.

   Your `sourceURLForBridge` method should look like this:

   ```objective-c
   - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
   {
     #if DEBUG
       return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
     #else
       return [CodePush bundleURL];
     #endif
   }
   ```

   ```swift
     override func bundleURL() -> URL? {
   #if DEBUG
       RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
   #else
       CodePush.bundleURL()
   #endif
     }
   ```

5. Add the Release channel public ID to `Info.plist`:

   To let the CodePush runtime know which release channel it should query for updates against, open your app's `Info.plist` file and add a new entry named `CodePushReleaseChannelPublicId`, whose value is the public ID of the release channel you want to configure this app against. You can retrieve this value by running `appzung release-channels list` in the AppZung CLI and copying the value of the `Public ID` column.

   You may want to refer to the [multiple environments](./advanced-usage.md#multiple-environments) docs before actually moving your app's usage of CodePush into production.

   _Note: If you need to dynamically use a different release channel, you can also override your release channel public ID in JS code using [Code-Push options](./api-js.md#CodePushOptions)_

6. [Configure code signing](./code-signing.md), this is optional but recommended for security

### (optional) HTTP exception domains configuration

CodePush plugin makes HTTPS requests to the following domains:

- codepush.appzung.com
- release-package-files-eu.appzung.com

If you want to change the default HTTP security configuration for any of these domains (most of the time you don't), you have to define the [`NSAppTransportSecurity` (ATS)][ats] configuration inside your **Info.plist** file:

```xml
<plist version="1.0">
  <dict>
    <!-- ...other configs... -->

    <key>NSAppTransportSecurity</key>
    <dict>
      <key>NSExceptionDomains</key>
      <dict>
        <key>codepush.appzung.com</key>
        <dict><!-- read the ATS Apple Docs for available options --></dict>
      </dict>
    </dict>

    <!-- ...other configs... -->
  </dict>
</plist>
```

Before doing anything, please [read the docs][ats] first.

[ats]: https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33
