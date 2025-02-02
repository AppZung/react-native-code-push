/**
 * Indicates the status of a deployment (after installing and restarting).
 */
export enum DeploymentStatus {
    /**
     * The deployment failed (and was rolled back).
     */
    FAILED = "DeploymentFailed",

    /**
     * The deployment succeeded.
     */
    SUCCEEDED = "DeploymentSucceeded"
}
