## Android Setup

- [Plugin Installation and Configuration](#plugin-installation-and-configuration)
- [Code Signing setup](#code-signing-setup)

### Plugin Installation and Configuration

1. In your `android/app/build.gradle` file, add the `codepush.gradle` file as an additional build task definition to the end of the file:

   ```gradle
   ...
   apply from: "../../node_modules/@appzung/react-native-code-push/android/codepush.gradle"
   ...
   ```

2. Update the `MainApplication` file to use CodePush via the following changes:

   If your MainApplication is a Kotlin file, update the `MainApplication.kt`

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

   If your MainApplication is a Java file: update the `MainApplication.java`

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

3. Add the release channel public ID to `strings.xml`:

   To let the CodePush runtime know which release channel it should query for updates, open your app's `strings.xml` file and add a new string named `CodePushReleaseChannelPublicId`, whose value is the public ID of the release channel you want to configure this app against. You can retrieve this value by running `appzung release-channels list` in the AppZung CLI and copying the value of the `Public ID` column.

   You may want to refer to the [multiple environments](./advanced-usage.md#multiple-environments) docs before actually moving your app's usage of CodePush into production.

   Your `strings.xml` should look like this:

   ```xml
    <resources>
        <string name="app_name">AppName</string>
        <string moduleConfig="true" name="CodePushReleaseChannelPublicId">ReleaseChannelPublicId</string>
    </resources>
   ```

   _Note: If you need to dynamically use a different release channel, you can also override your release channel public ID in JS code using [Code-Push options](./api-js.md#CodePushOptions)_

4. [Configure code signing](./code-signing.md), this is optional but recommended for security
