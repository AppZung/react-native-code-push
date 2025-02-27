## Advanced usage

### Multiple environments

#### Staging / Production

In a real-world scenario you would have `Staging` and `Production` apps that are different binaries, each using specific environment config (different package name, bundle identifier, API, feature flags etc). Create a release channel for each of these environments with `appzung release-channels create` and change the `CodePushReleaseChannelPublicId` on the native side with environment variables. You might want to use a module like [react-native-config](https://github.com/lugg/react-native-config) (or do it manually using build variants and configurations).

```groovy
// android/app/build.gradle
android {
    // ...
    defaultConfig {
        // ...
        resValue 'string', "CodePushReleaseChannelPublicId", project.env.get("CODEPUSH_RELEASE_CHANNEL_PUBLIC_ID_ANDROID")
    }
}
```

```
// ios/myapp/Info.plist

<key>CodePushReleaseChannelPublicId</key>
<string>$(CODEPUSH_RELEASE_CHANNEL_PUBLIC_ID_IOS)</string>
```

#### QA / Production

In the case where you have a `QA` environment that is completely iso-prod (meaning you can swap the JS bundle between those two apps), you may take advantage of the `promote` feature:

1. Release a CodePush update to your `QA` release channel using the `appzung releases deploy-react-native` command (or `appzung releases deploy` if you need more control)
2. Let QA test the build
3. Promote the tested release from `QA` to `Production` using the `appzung releases promote` command

_NOTE: If you want to take a more cautious approach, you can even choose to perform a "staged rollout" as part of #3, which allows you to mitigate additional potential risk with the update (like did your testing in #2 touch all possible devices/conditions?) by only making the production update available to a percentage of your users (for example `appzung releases promote -r 20`). Then, after waiting for a reasonable amount of time to see if any crash reports or customer feedback comes in, you can expand it to your entire audience by running `appzung releases edit -r 100`._

### Dynamic release channel assignment

The above section illustrated how you can leverage multiple CodePush release channels in order to effectively test your updates before broadly releasing them to your end users. However, since that workflow statically embeds the release channel assignment into the actual binary, a staging or production build will only ever sync updates from that release channel. In many cases, this is sufficient, since you only want your team, customers, stakeholders, etc. to sync with your pre-production releases, and therefore, only they need a build that knows how to sync with staging. However, if you want to be able to perform A/B tests, or provide early access of your app to certain users, it can prove very useful to be able to dynamically place specific users (or audiences) into specific release channels at runtime.

In order to achieve this kind of workflow, all you need to do is specify the release channel public ID you want the current user to synchronize with when calling the `codePush` method. When specified, this key will override the "default" one that was provided in your app's `Info.plist` (iOS) or strings resources (Android) files. This allows you to produce a build for staging or production, that is also capable of being dynamically "redirected" as needed.

```javascript
// Imagine that "userProfile" is a prop that this component received
// which includes the release channel public ID that the current user should use.
codePush.sync({ releaseChannelPublicId: userProfile.RELEASE_CHANNEL_PUBLIC_ID });
```

With that change in place, now it's just a matter of choosing how your app determines the right release channel for the current user. In practice, there are typically two solutions for this:

1. Expose a user-visible mechanism for changing release channels at any time. For example, your settings page could have a toggle for enabling "beta" access. This model works well if you're not concerned with the privacy of your pre-production updates, and you have power users that may want to opt-in to earlier (and potentially buggy) updates at their own will (kind of like Chrome channels). However, this solution puts the decision in the hands of your users, which doesn't help you perform A/B tests transparently.
2. Annotate the server-side profile of your users with an additional piece of metadata that indicates the release channel they should sync with. By default, your app could just use the binary-embedded key, but after a user has authenticated, your server can choose to "redirect" them to a different release channel, which allows you to incrementally place certain users or groups in different release channels as needed. You could even choose to store the server-response in local storage so that it becomes the new default. How you store the key alongside your user's profiles is entirely up to your authentication solution (for example Auth0, Firebase, custom DB + REST API), but is generally pretty trivial to do.

_NOTE: If needed, you could also implement a hybrid solution that allowed your end-users to toggle between different release channels, while also allowing your server to override that decision. This way, you have a hierarchy of "release channel resolution" that ensures your app has the ability to update itself out-of-the-box, your end users can feel rewarded by getting early access to bits, but you also have the ability to run A/B tests on your users as needed._

Are you using dynamic release channel assignments? Contact us at hello@appzung.com so that we may provide better integration.

### Using a custom server URL

This module lets you change the targeted CodePush server URL, this can be used by:

- People who use a self-hosted basic CodePush server like the open source Microsoft's code-push-server. Note that you won't be able to use most features of AppZung with these self-hosted servers. We're committed to keep this module compatible with the basic CodePush features so that our users are not locked in.
- Enterprise clients with a custom AppZung infrastructure

#### iOS

Add a `CodePushServerURL` in the `Info.plist` targeting your code-push server.

#### Android

Add a `CodePushServerUrl` in your strings resources targeting your code-push server.
