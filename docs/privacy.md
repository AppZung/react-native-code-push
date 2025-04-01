## Privacy / GDPR

It is up to you as the developer to choose how and if to be GDPR-compliant with your application.
We provide the following tools to help you implement privacy controls when needed.

From an end-user perspective, CodePush's core functionality of checking for and applying updates can be considered essential to the app's operation, as it ensures users receive bug fixes and improvements.
However, the telemetry features that collect usage data to provide you with deployment analytics might be considered non-essential from a privacy standpoint and could require explicit user consent under privacy regulations like GDPR.

- [Data transmission](#data-transmission)
- [Telemetry](#telemetry)

### Data transmission

By default, CodePush connects to the server to check for updates or for other API calls.

If you need to make it opt in or provide users with the ability to opt out of this behavior, you can use the data transmission controls.

#### Disabling data transmission by default (opt in)

You can disable data transmission by default by configuring your native app:

**Android:**

Add this to your `android/app/build.gradle` file:

```groovy
android {
    // ...
    defaultConfig {
        // ...
        resValue "bool", "CodePushDefaultDataTransmissionEnabled", "false"
    }
}
```

**iOS:**

Add this to your `ios/YourApp/Info.plist` file:

```
<key>CodePushDefaultDataTransmissionEnabled</key>
<false/>
```

#### Managing data transmission during runtime

You can also programmatically check or change data transmission status during app runtime.
This will persist across app sessions.

If you enable data transmission when it was disabled, checking for updates will work again immediately but if your app usually checks for update on app start, the next check will be on app start. You may want to call `sync` manually after resuming data transmission. We don't do this automatically to make things atomic and for the flexibility of the sync options.

```typescript
import * as CodePush from '@appzung/react-native-code-push';

// Check if data transmission is enabled
CodePush.getDataTransmissionEnabled().then((enabled) => {
  console.log('Data transmission is ' + (enabled ? 'enabled' : 'disabled'));
});

// Enable data transmission
CodePush.setDataTransmissionEnabled(true);

// Disable data transmission
CodePush.setDataTransmissionEnabled(false);
```

When data transmission is disabled, the CodePush client will not connect to the server to check for updates or for any other API calls.

### Telemetry

CodePush collects anonymous usage data by default for reporting downloads and installs (to provide you with analytics).
You may want to disable this telemetry collection for privacy regulations or user preferences.

#### Disabling telemetry by default (opt in)

You can disable telemetry by default by configuring your native app:

**Android:**

Add this to your `android/app/build.gradle` file:

```groovy
android {
    // ...
    defaultConfig {
        // ...
        resValue "bool", "CodePushDefaultTelemetryEnabled", "false"
    }
}
```

**iOS:**

Add this to your `ios/YourApp/Info.plist` file:

```
<key>CodePushDefaultTelemetryEnabled</key>
<false/>
```

#### Managing telemetry during runtime

You can also programmatically check or change telemetry status during app runtime.
This will persist across app sessions.

```typescript
import * as CodePush from '@appzung/react-native-code-push';

// Check if telemetry is enabled
CodePush.getTelemetryEnabled().then((enabled) => {
  console.log('Telemetry is ' + (enabled ? 'enabled' : 'disabled'));
});

// Enable telemetry
CodePush.setTelemetryEnabled(true);

// Disable telemetry
CodePush.setTelemetryEnabled(false);
```
