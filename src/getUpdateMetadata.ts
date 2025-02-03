import { UpdateState } from "./enums/UpdateState.enum";
import { NativeRNAppZungCodePushModule } from "./internals/NativeRNAppZungCodePushModule";
import type { LocalPackage } from "./types";
import { LocalPackageImplementation } from "./internals/LocalPackageImplementation";

/**
 * Retrieves the metadata for an installed update (e.g. description, mandatory).
 *
 * @param updateState The state of the update you want to retrieve the metadata for. Defaults to UpdateState.RUNNING.
 */
export async function getUpdateMetadata(updateState?: UpdateState): Promise<LocalPackage | null> {
    const nativeUpdateMetadata = await NativeRNAppZungCodePushModule.getUpdateMetadata(updateState || UpdateState.RUNNING);
    if (!nativeUpdateMetadata) {
        return null;
    }

    const localPackage = new LocalPackageImplementation(nativeUpdateMetadata);
    localPackage.failedInstall = await NativeRNAppZungCodePushModule.isFailedUpdate(nativeUpdateMetadata.packageHash);
    localPackage.isFirstRun = await NativeRNAppZungCodePushModule.isFirstRun(nativeUpdateMetadata.packageHash);
    return localPackage;
}
