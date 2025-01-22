## Android Setup

* [Plugin Installation and Configuration](#plugin-installation-and-configuration)
* [Code Signing setup](#code-signing-setup)

### Plugin Installation and Configuration

1. In your `android/settings.gradle` file, make the following additions at the end of the file:

    ```gradle
    ...
    include ':app', ':react-native-code-push'
    project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/@appzung/react-native-code-push/android/app')
    ```
    
2. In your `android/app/build.gradle` file, add the `codepush.gradle` file as an additional build task definition to the end of the file:

    ```gradle
    ...
    apply from: "../../node_modules/@appzung/react-native-code-push/android/codepush.gradle"
    ...
    ```

3. Update the `MainApplication` file to use CodePush via the following changes:

    For React Native 0.73 and above: update the `MainApplication.kt`

    ```kotlin
    ...
    // 1. Import the plugin class.
    import com.appzung.codepush.react.CodePush

    class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            ...

            // 2. Override the getJSBundleFile method in order to let
            // the CodePush runtime determine where to get the JS
            // bundle location from on each app start
            override fun getJSBundleFile(): String {
                return CodePush.getJSBundleFile() 
            }
        };
    }
    ```

    For React Native 0.72 and below: update the `MainApplication.java`

    ```java
    ...
    // 1. Import the plugin class.
    import com.appzung.codepush.react.CodePush;

    public class MainApplication extends Application implements ReactApplication {

        private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
            ...

            // 2. Override the getJSBundleFile method in order to let
            // the CodePush runtime determine where to get the JS
            // bundle location from on each app start
            @Override
            protected String getJSBundleFile() {
                return CodePush.getJSBundleFile();
            }
        };
    }
    ```

4. Add the release channel public ID to `strings.xml`:

   To let the CodePush runtime know which release channel it should query for updates, open your app's `strings.xml` file and add a new string named `CodePushReleaseChannelPublicId`, whose value is the public ID of the release channel you want to configure this app against. You can retrieve this value by running `appzung release-channels list` in the AppZung CLI and copying the value of the `Public ID` column. 

   You may want to refer to the [multiple environments](./advanced-usage.md#multiple-environments) docs before actually moving your app's usage of CodePush into production.

   Your `strings.xml` should look like this:

   ```xml
    <resources>
        <string name="app_name">AppName</string>
        <string moduleConfig="true" name="CodePushReleaseChannelPublicId">ReleaseChannelPublicId</string>
    </resources>
    ```

    *Note: If you need to dynamically use a different release channel, you can also override your release channel public ID in JS code using [Code-Push options](./api-js.md#CodePushOptions)*

### Code Signing setup

You can self sign bundles during release and verify its signature before installation of update. In order to use Public Key for Code Signing you need to do following steps:

Add the `CodePushSigningPublicKey` string resource in `/android/app/src/main/res/values/strings.xml`. It may looks like this:

 ```xml
 <resources>
    <string name="app_name">my_app</string>
    <string name="CodePushSigningPublicKey">-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtPSR9lkGzZ4FR0lxF+ZA
P6jJ8+Xi5L601BPN4QESoRVSrJM08roOCVrs4qoYqYJy3Of2cQWvNBEh8ti3FhHu
tiuLFpNdfzM4DjAw0Ti5hOTfTixqVBXTJPYpSjDh7K6tUvp9MV0l5q/Ps3se1vud
M1/X6g54lIX/QoEXTdMgR+SKXvlUIC13T7GkDHT6Z4RlwxkWkOmf2tGguRcEBL6j
ww7w/3g0kWILz7nNPtXyDhIB9WLH7MKSJWdVCZm+cAqabUfpCFo7sHiyHLnUxcVY
OTw3sz9ceaci7z2r8SZdsfjyjiDJrq69eWtvKVUpredy9HtyALtNuLjDITahdh8A
zwIDAQAB
-----END PUBLIC KEY-----</string>
</resources>
 ```
