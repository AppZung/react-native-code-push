import { Platform } from 'react-native';
import { LogLevel } from './enums/LogLevel.enum';
import { CodePushApiSdk } from './internals/CodePushApiSdk';
import type { ApiSdkQueryUpdatePackageInfo } from './internals/CodePushApiSdk.types';
import { NativeRNAppZungCodePushModule } from './internals/NativeRNAppZungCodePushModule';
import { RemotePackageImpl } from './internals/RemotePackageImplementation';
import { getConfiguration } from './internals/getConfiguration';
import { getCurrentPackage } from './internals/getCurrentPackage';
import type { Configuration } from './internals/types';
import { log } from './internals/utils/log';
import { requestFetchAdapter } from './internals/utils/requestFetchAdapter';
import type { HandleBinaryVersionMismatchCallback, RemotePackage } from './types';

/**
 * Asks the CodePush service whether the configured app release channel has an update available.
 *
 * @param releaseChannelPublicId The release channel public ID to use to query the CodePush server for an update.
 * @param handleBinaryVersionMismatchCallback An optional callback for handling target binary version mismatch
 */
export async function checkForUpdate(
  releaseChannelPublicId?: string,
  handleBinaryVersionMismatchCallback?: HandleBinaryVersionMismatchCallback,
): Promise<RemotePackage | null> {
  /*
   * Before we ask the server if an update exists, we
   * need to retrieve three pieces of information from the
   * native side: release channel, app version (e.g. 1.0.1)
   * and the hash of the currently running update (if there is one).
   * This allows the client to only receive updates which are targeted
   * for their specific release channel and version and which are actually
   * different from the CodePush update they have already installed.
   */
  const nativeConfig = await getConfiguration();
  /*
   * If a release channel was explicitly provided,
   * then let's override the one we retrieved
   * from the native-side of the app. This allows
   * dynamically "redirecting" end-users at different
   * release channels (e.g. an early access release channel for insiders).
   */
  const config: Configuration = releaseChannelPublicId ? { ...nativeConfig, releaseChannelPublicId } : nativeConfig;
  const sdk = new CodePushApiSdk(requestFetchAdapter, log, config);

  const localPackage = await getCurrentPackage();

  /*
   * If the app has a previously installed update, and that update
   * was targeted at the same app version that is currently running,
   * then we want to use its package hash to determine whether a new
   * release has been made on the server. Otherwise, we only need
   * to send the app version to the server, since we are interested
   * in any updates for current binary version, regardless of hash.
   */
  const queryPackage: ApiSdkQueryUpdatePackageInfo = localPackage ?? {
    appVersion: config.appVersion,
    ...(Platform.OS === 'ios' && config.packageHash ? { packageHash: config.packageHash } : {}),
  };

  const update = await sdk.queryUpdateWithCurrentPackage(queryPackage);

  /*
   * There are four cases where checkForUpdate will resolve to null:
   * ----------------------------------------------------------------
   * 1) The server said there isn't an update. This is the most common case.
   * 2) The server said there is an update but it requires a newer binary version.
   *    This would occur when end-users are running an older binary version than
   *    is available, and CodePush is making sure they don't get an update that
   *    potentially wouldn't be compatible with what they are running.
   * 3) The server said there is an update, but the update's hash is the same as
   *    the currently running update. This should _never_ happen, unless there is a
   *    bug in the server, but we're adding this check just to double-check that the
   *    client app is resilient to a potential issue with the update check.
   * 4) The server said there is an update, but the update's hash is the same as that
   *    of the binary's currently running version. This should only happen in Android -
   *    unlike iOS, we don't attach the binary's hash to the updateCheck request
   *    because we want to avoid having to install diff updates against the binary's
   *    version, which we can't do yet on Android.
   */
  if (!update) {
    return null;
  }

  if ('updateAppVersion' in update) {
    if (!update.updateAppVersion) {
      throw new Error('updateAppVersion should never be false');
    }

    log(LogLevel.INFO, 'An update is available but it is not targeting the binary version of your app.');
    handleBinaryVersionMismatchCallback?.(update);

    return null;
  }

  if (
    (localPackage && update.packageHash === localPackage.packageHash) ||
    ((!localPackage || ('_isDebugOnly' in localPackage && localPackage._isDebugOnly)) &&
      config.packageHash === update.packageHash)
  ) {
    return null;
  }

  const remotePackageData: Omit<RemotePackage, 'download'> = {
    ...update,
    releaseChannelPublicId: releaseChannelPublicId || nativeConfig.releaseChannelPublicId,
    failedInstall: await NativeRNAppZungCodePushModule.isFailedUpdate(update.packageHash),
    isFirstRun: false,
    isPending: false,
  };

  return new RemotePackageImpl(remotePackageData, (packageInfo) => sdk.reportStatusDownload(packageInfo));
}
