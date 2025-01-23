## Code signing

* [Configure your release process](#configure-your-release-process)
* [Setup Android](#setup-android)
* [Setup iOS](#setup-ios)

Code signing is a security feature that helps ensure the integrity and authenticity of your app updates.
It means no attacker can alter your bundled code sent to AppZung.

### Configure your release process

Generate the key pair:

```shell
# generate private RSA key
openssl genrsa -out private_codepush_signing_key.pem
# export public key
openssl rsa -pubout -in private_codepush_signing_key.pem -out public_codepush_signing_key.pem
```

Store the private key securely.

In the `appzung releases deploy-react-native` command that you run during your release process, add the `--private-key-path` flag pointing to the private key path.
You should see `Code signing: true` in the confirmation text in interactive mode.

### Setup Android

Add the `CodePushSigningPublicKey` string resource in `/android/app/src/main/res/values/strings.xml`. It may look like this:

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

### Setup iOS

Add record in `Info.plist` with name `CodePushSigningPublicKey` and string value of public key content. Example:

```xml
<plist version="1.0">
  <dict>
    <!-- ...other configs... -->

    <key>CodePushSigningPublicKey</key>
        <string>-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANkWYydPuyOumR/sn2agNBVDnzyRpM16NAUpYPGxNgjSEp0etkDNgzzdzyvyl+OsAGBYF3jCxYOXozum+uV5hQECAwEAAQ==
-----END PUBLIC KEY-----</string>

    <!-- ...other configs... -->
  </dict>
</plist>
```
