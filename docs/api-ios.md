## Objective-C API reference (iOS)

The Objective-C API is made available by importing the `CodePush.h` header into your `AppDelegate.m` file, and consists of a single public class named `CodePush`.

### CodePush

Contains static methods for retreiving the `NSURL` that represents the most recent JavaScript bundle file, and can be passed to the `RCTRootView`'s `initWithBundleURL` method when bootstrapping your app in the `AppDelegate.m` file.

#### Methods

- __(NSURL \*)bundleURL__ - Returns the most recent JS bundle `NSURL` as described above. This method assumes that the name of the JS bundle contained within your app binary is `main.jsbundle`.

- __(NSURL \*)bundleURLForResource:(NSString \*)resourceName__ - Equivalent to the `bundleURL` method, but also allows customizing the name of the JS bundle that is looked for within the app binary. This is useful if you aren't naming this file `main` (which is the default convention). This method assumes that the JS bundle's extension is `*.jsbundle`.

- __(NSURL \*)bundleURLForResource:(NSString \*)resourceName withExtension:(NSString \*)resourceExtension__: Equivalent to the `bundleURLForResource:` method, but also allows customizing the extension used by the JS bundle that is looked for within the app binary. This is useful if you aren't naming this file `*.jsbundle` (which is the default convention).

- __(void)overrideAppVersion:(NSString \*)appVersionOverride__ - Sets the version of the application's binary interface, which would otherwise default to the App Store version specified as the `CFBundleShortVersionString` in the `Info.plist`. This should be called a single time, before the bundle URL is loaded.

- __(void)setDeploymentKey:(NSString \*)deploymentKey__ - Sets the deployment key that the app should use when querying for updates. This is a dynamic alternative to setting the deployment key in your `Info.plist` and/or specifying a deployment key in JS when calling `checkForUpdate` or `sync`.
