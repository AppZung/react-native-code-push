package com.appzung.codepush.react;

import com.facebook.react.bridge.ReactApplicationContext;

public class ExpoUtils {

    /**
     * Detects if the app is running in an Expo environment by checking for
     * the presence of Expo's ReactNativeHostWrapper class.
     *
     * @param reactContext The React application context
     * @return true if Expo environment is detected, false otherwise
     */
    public static boolean detectExpoEnvironment(ReactApplicationContext reactContext) {
        try {
            Class.forName("expo.modules.ReactNativeHostWrapper");
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }
}
