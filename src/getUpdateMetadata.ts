import { UpdateState } from "./enums/UpdateState.enum";
import { NativeRNAppZungCodePushModule } from "./internals/NativeRNAppZungCodePushModule";
import { packageMixins } from "./internals/packageMixins";
import type { LocalPackage } from "./types";

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

    const localPackage: LocalPackage = {...packageMixins.local, ...nativeUpdateMetadata };
    localPackage.failedInstall = await NativeRNAppZungCodePushModule.isFailedUpdate(nativeUpdateMetadata.packageHash);
    localPackage.isFirstRun = await NativeRNAppZungCodePushModule.isFirstRun(nativeUpdateMetadata.packageHash);
    return localPackage;
}
