package com.appzung.codepush.react;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.ReactHost;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class CodePush implements ReactPackage {
    private static final Object LOCK = new Object();
    private static volatile CodePush mCurrentInstance;

    public static CodePush getInstance(Context context) {
        if (mCurrentInstance == null) {
            synchronized (LOCK) {
                if (mCurrentInstance == null) {
                    mCurrentInstance = new CodePush(context);
                }
            }
        }
        return mCurrentInstance;
    }

    private static boolean sIsRunningBinaryVersion = false;
    private static boolean sNeedToReportRollback = false;
    private static boolean sTestConfigurationFlag = false;
    private static String sAppVersion = null;

    private boolean mDidUpdate = false;

    private String mAssetsBundleFileName;

    // Helper classes.
    private CodePushUpdateManager mUpdateManager;
    private CodePushTelemetryManager mTelemetryManager;
    private SettingsManager mSettingsManager;

    // Config properties.
    private String mReleaseChannelPublicId;
    private static String mServerUrl = "https://codepush.appzung.com/";

    private Context mContext;
    private final boolean mIsDebugMode = BuildConfig.DEBUG;

    private static String mPublicKey;

    private static ReactInstanceHolder mReactInstanceHolder;

    private static ReactHostHolder mReactHostHolder;

    public static String getServiceUrl() {
        return mServerUrl;
    }

    private CodePush(Context context) {
        mContext = context.getApplicationContext();

        String releaseChannelPublicIdFromStrings = getCustomPropertyFromStringsIfExist("ReleaseChannelPublicId");
        if (releaseChannelPublicIdFromStrings == null) {
            throw new CodePushUnknownException("Missing release channel public ID in strings resource");
        }

        mReleaseChannelPublicId = releaseChannelPublicIdFromStrings;

        mUpdateManager = new CodePushUpdateManager(context.getFilesDir().getAbsolutePath());
        mTelemetryManager = new CodePushTelemetryManager(mContext);
        mSettingsManager = new SettingsManager(mContext);

        if (mIsDebugMode) {
            CodePushUtils.log("Running in DEBUG mode");
        }

        if (sAppVersion == null) {
            try {
                PackageInfo pInfo = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0);
                sAppVersion = pInfo.versionName;
            } catch (PackageManager.NameNotFoundException e) {
                throw new CodePushUnknownException("Unable to get package info for " + mContext.getPackageName(), e);
            }
        }

        mCurrentInstance = this;

        String publicKeyFromStrings = getCustomPropertyFromStringsIfExist("SigningPublicKey");
        if (publicKeyFromStrings != null) {
            CodePushUtils.log("Executing CodePush with a signing public key.");
            mPublicKey = publicKeyFromStrings;
        }

        String serverUrlFromStrings = getCustomPropertyFromStringsIfExist("ServerUrl");
        if (serverUrlFromStrings == null) {
            serverUrlFromStrings = getCustomPropertyFromStringsIfExist("ServerURL");
        }
        if (serverUrlFromStrings != null) {
            CodePushUtils.log("Executing CodePush with a custom server URL.");
            mServerUrl = serverUrlFromStrings;
        }

        clearDebugCacheIfNeeded(false);
        initializeUpdateAfterRestart();
    }

    private String getCustomPropertyFromStringsIfExist(String propertyName) {
        String property;

        String packageName = mContext.getPackageName();
        int resId = mContext.getResources().getIdentifier("CodePush" + propertyName, "string", packageName);

        if (resId != 0) {
            property = mContext.getString(resId);

            if (!property.isEmpty()) {
                return property;
            } else {
                CodePushUtils.log("Specified " + propertyName + " is empty");
            }
        }

        return null;
    }

    public void clearDebugCacheIfNeeded(boolean isLiveReloadEnabled) {
        // Issue: https://github.com/microsoft/react-native-code-push/issues/1272
        if (mIsDebugMode && mSettingsManager.isPendingUpdate(null) && !isLiveReloadEnabled) {
            // This needs to be kept in sync with https://github.com/facebook/react-native/blob/master/ReactAndroid/src/main/java/com/facebook/react/devsupport/DevSupportManager.java#L78
            File cachedDevBundle = new File(mContext.getFilesDir(), "ReactNativeDevBundle.js");
            if (cachedDevBundle.exists()) {
                cachedDevBundle.delete();
            }
        }
    }

    public boolean didUpdate() {
        return mDidUpdate;
    }

    public String getAppVersion() {
        return sAppVersion;
    }

    public String getAssetsBundleFileName() {
        return mAssetsBundleFileName;
    }

    public String getPublicKey() {
        return mPublicKey;
    }

    long getBinaryResourcesModifiedTime() {
        try {
            String packageName = this.mContext.getPackageName();
            int codePushApkBuildTimeId = this.mContext.getResources().getIdentifier(CodePushConstants.CODE_PUSH_APK_BUILD_TIME_KEY, "string", packageName);
            // replace double quotes needed for correct restoration of long value from strings.xml
            // https://github.com/microsoft/cordova-plugin-code-push/issues/264
            String codePushApkBuildTime = this.mContext.getResources().getString(codePushApkBuildTimeId).replaceAll("\"","");
            return Long.parseLong(codePushApkBuildTime);
        } catch (Exception e) {
            throw new CodePushUnknownException("Error in getting binary resources modified time", e);
        }
    }

    public String getPackageFolder() {
        JSONObject codePushLocalPackage = mUpdateManager.getCurrentPackage();
        if (codePushLocalPackage == null) {
            return null;
        }
        return mUpdateManager.getPackageFolderPath(codePushLocalPackage.optString("packageHash"));
    }

    @Deprecated
    public static String getBundleUrl() {
        return getJSBundleFile();
    }

    @Deprecated
    public static String getBundleUrl(String assetsBundleFileName) {
        return getJSBundleFile(assetsBundleFileName);
    }

    public Context getContext() {
        return mContext;
    }

    public String getReleaseChannelPublicId() {
        return mReleaseChannelPublicId;
    }

    public static String getJSBundleFile() {
        return CodePush.getJSBundleFile(CodePushConstants.DEFAULT_JS_BUNDLE_NAME);
    }

    public static String getJSBundleFile(String assetsBundleFileName) {
        if (mCurrentInstance == null) {
            CodePushUtils.log("A CodePush instance has not been created yet. Have you added it to your app's list of ReactPackages?");
            throw new CodePushNotInitializedException("A CodePush instance has not been created yet. Have you added it to your app's list of ReactPackages?");
        }

        return mCurrentInstance.getJSBundleFileInternal(assetsBundleFileName);
    }

    public String getJSBundleFileInternal(String assetsBundleFileName) {
        this.mAssetsBundleFileName = assetsBundleFileName;
        String binaryJsBundleUrl = CodePushConstants.ASSETS_BUNDLE_PREFIX + assetsBundleFileName;

        String packageFilePath = null;
        try {
            packageFilePath = mUpdateManager.getCurrentPackageBundlePath(this.mAssetsBundleFileName);
        } catch (CodePushMalformedDataException e) {
            // We need to recover the app in case 'codepush.json' is corrupted
            CodePushUtils.log(e.getMessage());
            clearUpdates();
        }

        if (packageFilePath == null) {
            // There has not been any downloaded updates.
            CodePushUtils.logBundleUrl(binaryJsBundleUrl);
            sIsRunningBinaryVersion = true;
            return binaryJsBundleUrl;
        }

        JSONObject packageMetadata = this.mUpdateManager.getCurrentPackage();
        if (isPackageBundleLatest(packageMetadata)) {
            CodePushUtils.logBundleUrl(packageFilePath);
            sIsRunningBinaryVersion = false;
            return packageFilePath;
        } else {
            // The binary version is newer.
            this.mDidUpdate = false;
            if (!this.mIsDebugMode || hasBinaryVersionChanged(packageMetadata)) {
                this.clearUpdates();
            }

            CodePushUtils.logBundleUrl(binaryJsBundleUrl);
            sIsRunningBinaryVersion = true;
            return binaryJsBundleUrl;
        }
    }

    public String getServerUrl() {
        return mServerUrl;
    }

    void initializeUpdateAfterRestart() {
        // Reset the state which indicates that
        // the app was just freshly updated.
        mDidUpdate = false;

        JSONObject pendingUpdate = mSettingsManager.getPendingUpdate();
        if (pendingUpdate != null) {
            JSONObject packageMetadata = null;

            try {
                packageMetadata = this.mUpdateManager.getCurrentPackage();
            } catch (CodePushMalformedDataException e) {
                // We need to recover the app in case 'codepush.json' is corrupted
                CodePushUtils.log(e);
                clearUpdates();
                return;
            }
            if (packageMetadata == null || !isPackageBundleLatest(packageMetadata) && hasBinaryVersionChanged(packageMetadata)) {
                CodePushUtils.log("Skipping initializeUpdateAfterRestart(), binary version is newer");
                return;
            }

            try {
                boolean updateIsLoading = pendingUpdate.getBoolean(CodePushConstants.PENDING_UPDATE_IS_LOADING_KEY);
                if (updateIsLoading) {
                    // Pending update was initialized, but notifyApplicationReady was not called.
                    // Therefore, deduce that it is a broken update and rollback.
                    CodePushUtils.log("Update did not finish loading the last time, rolling back to a previous version.");
                    sNeedToReportRollback = true;
                    rollbackPackage();
                } else {
                    // There is in fact a new update running for the first
                    // time, so update the local state to ensure the client knows.
                    mDidUpdate = true;

                    // Mark that we tried to initialize the new update, so that if it crashes,
                    // we will know that we need to rollback when the app next starts.
                    mSettingsManager.savePendingUpdate(pendingUpdate.getString(CodePushConstants.PENDING_UPDATE_HASH_KEY),
                            /* isLoading */true);
                }
            } catch (JSONException e) {
                // Should not happen.
                throw new CodePushUnknownException("Unable to read pending update metadata stored in SharedPreferences", e);
            }
        }
    }

    void invalidateCurrentInstance() {
        mCurrentInstance = null;
    }

    boolean isDebugMode() {
        return mIsDebugMode;
    }

    boolean isRunningBinaryVersion() {
        return sIsRunningBinaryVersion;
    }

    private boolean isPackageBundleLatest(JSONObject packageMetadata) {
        try {
            Long binaryModifiedDateDuringPackageInstall = null;
            String binaryModifiedDateDuringPackageInstallString = packageMetadata.optString(CodePushConstants.BINARY_MODIFIED_TIME_KEY, null);
            if (binaryModifiedDateDuringPackageInstallString != null) {
                binaryModifiedDateDuringPackageInstall = Long.parseLong(binaryModifiedDateDuringPackageInstallString);
            }
            String packageAppVersion = packageMetadata.optString("appVersion", null);
            long binaryResourcesModifiedTime = this.getBinaryResourcesModifiedTime();
            return binaryModifiedDateDuringPackageInstall != null &&
                    binaryModifiedDateDuringPackageInstall == binaryResourcesModifiedTime &&
                    (isUsingTestConfiguration() || sAppVersion.equals(packageAppVersion));
        } catch (NumberFormatException e) {
            throw new CodePushUnknownException("Error in reading binary modified date from package metadata", e);
        }
    }

    private boolean hasBinaryVersionChanged(JSONObject packageMetadata) {
        String packageAppVersion = packageMetadata.optString("appVersion", null);
        return !sAppVersion.equals(packageAppVersion);
    }

    boolean needToReportRollback() {
        return sNeedToReportRollback;
    }

    public static void overrideAppVersion(String appVersionOverride) {
        sAppVersion = appVersionOverride;
    }

    private void rollbackPackage() {
        JSONObject failedPackage = mUpdateManager.getCurrentPackage();
        mSettingsManager.saveFailedUpdate(failedPackage);
        mUpdateManager.rollbackPackage();
        mSettingsManager.removePendingUpdate();
    }

    public void setNeedToReportRollback(boolean needToReportRollback) {
        CodePush.sNeedToReportRollback = needToReportRollback;
    }

    /* The below 3 methods are used for running tests.*/
    public static boolean isUsingTestConfiguration() {
        return sTestConfigurationFlag;
    }

    public void setReleaseChannelPublicId(String releaseChannelPublicId) {
        mReleaseChannelPublicId = releaseChannelPublicId;
    }

    public static void setUsingTestConfiguration(boolean shouldUseTestConfiguration) {
        sTestConfigurationFlag = shouldUseTestConfiguration;
    }

    public void clearUpdates() {
        mUpdateManager.clearUpdates();
        mSettingsManager.removePendingUpdate();
        mSettingsManager.removeFailedUpdates();
    }

    public static void setReactInstanceHolder(ReactInstanceHolder reactInstanceHolder) {
        mReactInstanceHolder = reactInstanceHolder;
    }

    static ReactInstanceManager getReactInstanceManager() {
        if (mReactInstanceHolder == null) {
            return null;
        }
        return mReactInstanceHolder.getReactInstanceManager();
    }

    public static void setReactHost(ReactHostHolder reactHostHolder) {
        mReactHostHolder = reactHostHolder;
    }

    static ReactHost getReactHost() {
        if (mReactHostHolder == null) {
            return null;
        }

        return mReactHostHolder.getReactHost();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        CodePushNativeModule codePushModule = new CodePushNativeModule(reactApplicationContext, this, mUpdateManager, mTelemetryManager, mSettingsManager);

        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(codePushModule);
        return nativeModules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return new ArrayList<>();
    }
}
