package com.appzung.codepush.react;

import android.content.Context;

public class CodePushBuilder {
    private String mReleaseChannelPublicId;
    private Context mContext;

    private boolean mIsDebugMode;
    private String mServerUrl;
    private Integer mPublicKeyResourceDescriptor;

    public CodePushBuilder(String releaseChannelPublicId, Context context) {
        this.mReleaseChannelPublicId = releaseChannelPublicId;
        this.mContext = context;
        this.mServerUrl = CodePush.getServiceUrl();
    }

    public CodePushBuilder setIsDebugMode(boolean isDebugMode) {
        this.mIsDebugMode = isDebugMode;
        return this;
    }

    public CodePushBuilder setServerUrl(String serverUrl) {
        this.mServerUrl = serverUrl;
        return this;
    }

    public CodePushBuilder setPublicKeyResourceDescriptor(int publicKeyResourceDescriptor) {
        this.mPublicKeyResourceDescriptor = publicKeyResourceDescriptor;
        return this;
    }

    public CodePush build() {
        return new CodePush(this.mReleaseChannelPublicId, this.mContext, this.mIsDebugMode, this.mServerUrl, this.mPublicKeyResourceDescriptor);
    }
}
