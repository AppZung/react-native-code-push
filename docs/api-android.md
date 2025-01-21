## Java API reference (Android)

You can customize CodePush by placing these values in string resources.

* __Deployment Key__ - The default release channel's **public ID** that will be used to check updates. For example:
    ```xml
    <string moduleConfig="true" name="CodePushDeploymentKey">sU0Eikse9JFCDLZmAT-_lUSwDWACrSGgTKCXyWqcE0</string>
    ```

* __Public Key__ - used for bundle verification in the Code Signing Feature. Please refer to [Code Signing](setup-android.md#code-signing-setup) section for more details about the Code Signing Feature.
  To set the public key, you should add the content of the public key to `strings.xml` with name `CodePushSigningPublicKey`. CodePush automatically gets this property and enables the Code Signing feature. For example:
  ```xml
  <string moduleConfig="true" name="CodePushSigningPublicKey">your-public-key</string>
  ```

* __Server Url__ - used for specifying CodePush Server Url (as an Enterprise customer we may setup a custom infra for your needs).
    The Default value: "https://codepush.appzung.com/" is overridden by adding your path to `strings.xml` with name `CodePushServerUrl`. CodePush automatically gets this property and will use this path to send requests. For example:
    ```xml
    <string moduleConfig="true" name="CodePushServerUrl">https://codepush.yourdomain.com</string>
    ```
