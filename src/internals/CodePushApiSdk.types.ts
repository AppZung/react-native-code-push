export interface ApiSdkQueryUpdatePackageInfo {
  appVersion: string;
  label?: string;
  packageHash?: string;
}

export interface ApiSdkDeployReportPackageInfo {
  label: string;
  appVersion: string;
}

export interface ApiSdkDownloadReportPackageInfo {
  label: string;
}

export interface ApiSdkRemotePackage {
  releaseChannelPublicId: string;
  label: string;
  appVersion: string;
  description: string;
  isMandatory: boolean;
  packageSize: number;
  packageHash: string;
  downloadUrl: string;
}

export interface ApiSdkNativeUpdateNotification {
  updateAppVersion: true;
  appVersion: string;
}

export namespace Http {
  export interface Response {
    statusCode: number;
    body?: string;
  }

  export interface Requester {
    request(verb: 'GET' | 'POST', url: string, requestBody?: string | object | null): Promise<Response>;
  }
}

export interface ApiSdkConfiguration {
  appVersion: string;
  clientUniqueId: string;
  releaseChannelPublicId: string;
  serverUrl: string;
  ignoreAppVersion?: boolean;
}

/**
 * Indicates the status of a deployment (after installing and restarting).
 */
export enum DeploymentStatus {
  /**
   * The deployment failed (and was rolled back).
   */
  FAILED = 'DeploymentFailed',

  /**
   * The deployment succeeded.
   */
  SUCCEEDED = 'DeploymentSucceeded',
}

export interface ReportDeployInput {
  deployment_key: string;
  app_version: string;
  status?: DeploymentStatus;
  label?: string;
  client_unique_id?: string;
  previous_label_or_app_version?: string;
  previous_deployment_key?: string;
}

export interface ReportDownloadInput {
  deployment_key: string;
  label: string;
  client_unique_id?: string;
}

export interface CheckUpdateRequestInput {
  deployment_key: string;
  app_version: string;
  package_hash?: string;
  label?: string;
  client_unique_id?: string;
  is_companion?: boolean;
  previous_label_or_app_version?: string;
  previous_deployment_key?: string;
}

export interface CheckUpdateResponse {
  update_info:
    | {
        is_available: true;
        target_binary_range: string;
        description: string;
        is_disabled: boolean;
        is_mandatory: boolean;
        rollout: number;
        download_url: string;
        package_size: number;
        package_hash: string;
        label: string;
        should_run_binary_version: boolean;
        update_app_version: boolean;
      }
    | {
        is_available: false;
        should_run_binary_version: boolean;
        target_binary_range: string;
        update_app_version?: boolean;
      };
}
