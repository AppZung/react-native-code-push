## Windows Setup

Once you've acquired the CodePush plugin, you need to integrate it into the Visual Studio project of your React Native app and configure it correctly. To do this, take the following steps:

### Plugin Installation (Windows-npx)

Once the plugin has been downloaded, run `npx react-native autolink-windows` in your application's root directory to automatically add the CodePush c++ project to your application's windows solution file.

### Plugin Configuration (Windows)

1. Replace the following files located at `windows/<app name>` with those in the CodePushDemoAppCpp example app in this repo found at `Examples/CodePushDemoAppCpp/windows/CodePushDemoAppCpp`:
   1. app.h
   2. app.cpp
   3. app.xaml

2. In the above files, replace any occurance of `CodePushDemoAppCpp` with the name of your application

3. Enter your application's app version and deployment key to the `configMap` object at the top of your app's `OnLaunched` method in `App.cpp`:

```c++
...
void App::OnLaunched(activation::LaunchActivatedEventArgs const& e)
{
    winrt::Microsoft::CodePush::ReactNative::CodePushConfig::SetHost(Host());
    auto configMap{ winrt::single_threaded_map<hstring, hstring>() };
    configMap.Insert(L"appVersion", L"1.0.0");
    configMap.Insert(L"deploymentKey", L"<app deployment key>");
    winrt::Microsoft::CodePush::ReactNative::CodePushConfig::Init(configMap);
...
}
...
```

### Plugin Configuration (Windows) C#

1. add name space `Microsoft.CodePush` to `App.xaml.cs`

2. add app version and deployment key to `configMap` at the start of your app's `OnLaunched` method in `App.xaml.cs`.

```c#
using Microsoft.CodePush;

...
protected override void OnLaunched(LaunchActivatedEventArgs e)
{
    Microsoft.CodePush.ReactNative.CodePushConfig.SetHost(Host);
    IDictionary<string, string> configMap = new Dictionary<string, string>();
    configMap.Add("appVersion", "1.0.0");
    configMap.Add("deploymentKey", "deployment key");
    Microsoft.CodePush.ReactNative.CodePushConfig.Init(configMap);
...
}
...
```
