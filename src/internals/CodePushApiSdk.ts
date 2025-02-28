import { CodePushError, CodePushHttpError } from './CodePushApiSdk.errors';
import {
  type ApiSdkConfiguration,
  type ApiSdkDeployReportPackageInfo,
  type ApiSdkDownloadReportPackageInfo,
  type ApiSdkNativeUpdateNotification,
  type ApiSdkQueryUpdatePackageInfo,
  type ApiSdkRemotePackage,
  type CheckUpdateRequestInput,
  type CheckUpdateResponse,
  DeploymentStatus,
  type Http,
  type ReportDeployInput,
  type ReportDownloadInput,
} from './CodePushApiSdk.types';
import { queryStringify } from './utils/queryStringify';

// TODO move this to @appzung/code-push-api-sdk

export class CodePushApiSdk {
  private configuration: ApiSdkConfiguration;

  constructor(
    private readonly httpRequester: Http.Requester,
    configuration: ApiSdkConfiguration,
  ) {
    this.configuration = { ...configuration };
    if (this.configuration.serverUrl.slice(-1) !== '/') {
      this.configuration.serverUrl += '/';
    }
    this.configuration.serverUrl += 'v0.1/public/codepush';
  }

  async queryUpdateWithCurrentPackage(
    currentPackageInfo: ApiSdkQueryUpdatePackageInfo,
  ): Promise<ApiSdkRemotePackage | ApiSdkNativeUpdateNotification | null> {
    const query: CheckUpdateRequestInput = {
      deployment_key: this.configuration.releaseChannelPublicId,
      app_version: currentPackageInfo.appVersion,
      package_hash: currentPackageInfo.packageHash,
      is_companion: this.configuration.ignoreAppVersion,
      label: currentPackageInfo.label,
      client_unique_id: this.configuration.clientUniqueId,
    };

    const url = `${this.configuration.serverUrl}/update_check?${queryStringify(query)}`;

    const response = await this.httpRequester.request('GET', url);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new CodePushHttpError(url, response.statusCode, response.body || 'No body');
    }

    const responseObject: CheckUpdateResponse | Record<string, never> = JSON.parse(response.body || '{}');
    if (!responseObject.update_info) {
      throw new CodePushError('Missing update info in response');
    }

    const { update_info: updateInfo } = responseObject;

    if (updateInfo.update_app_version) {
      return {
        updateAppVersion: true,
        appVersion: responseObject.update_info.target_binary_range,
      };
    }

    if (!updateInfo.is_available) {
      return null;
    }

    return {
      releaseChannelPublicId: this.configuration.releaseChannelPublicId,
      description: updateInfo.description,
      label: updateInfo.label,
      appVersion: updateInfo.target_binary_range,
      isMandatory: updateInfo.is_mandatory,
      packageHash: updateInfo.package_hash,
      packageSize: updateInfo.package_size,
      downloadUrl: updateInfo.download_url,
    };
  }

  async reportStatusDeploy(
    deployedPackageInfo: { package: ApiSdkDeployReportPackageInfo; status: DeploymentStatus } | null,
    previousLabelOrAppVersion: string | null,
    previousDeploymentKey: string | null,
  ): Promise<void> {
    const requestBody: ReportDeployInput = {
      app_version: this.configuration.appVersion,
      deployment_key: this.configuration.releaseChannelPublicId,
      client_unique_id: this.configuration.clientUniqueId,
    };

    if (deployedPackageInfo) {
      requestBody.label = deployedPackageInfo.package.label;
      requestBody.app_version = deployedPackageInfo.package.appVersion;
      requestBody.status = deployedPackageInfo.status;
    }

    if (previousLabelOrAppVersion) {
      requestBody.previous_label_or_app_version = previousLabelOrAppVersion;
    }

    if (previousDeploymentKey) {
      requestBody.previous_deployment_key = previousDeploymentKey;
    }

    const url = `${this.configuration.serverUrl}/report_status/deploy`;

    const response = await this.httpRequester.request('POST', url, JSON.stringify(requestBody));

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new CodePushHttpError(url, response.statusCode, response.body || 'No body');
    }
  }

  async reportStatusDownload(downloadedPackage: ApiSdkDownloadReportPackageInfo): Promise<void> {
    const requestBody: ReportDownloadInput = {
      client_unique_id: this.configuration.clientUniqueId,
      deployment_key: this.configuration.releaseChannelPublicId,
      label: downloadedPackage.label,
    };

    const url = `${this.configuration.serverUrl}/report_status/download`;

    const response = await this.httpRequester.request('POST', url, JSON.stringify(requestBody));

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new CodePushHttpError(url, response.statusCode, response.body || 'No body');
    }
  }
}
