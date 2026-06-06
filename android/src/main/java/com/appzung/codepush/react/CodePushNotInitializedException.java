package com.appzung.codepush.react;

public final class CodePushNotInitializedException extends RuntimeException {

    public CodePushNotInitializedException(String message, Throwable cause) {
        super(message, cause);
    }

    public CodePushNotInitializedException(String message) {
        super(message);
    }
}
