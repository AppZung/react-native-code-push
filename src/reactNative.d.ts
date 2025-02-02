declare module "react-native" {
    export type PlatformStatic = {
        OS: "ios" | "android" | "windows"
    };
    export const Platform: PlatformStatic;

    export interface NativeEventSubscription {
        /**
         * Call this method to un-subscribe from a native-event
         */
        remove(): void;
    }

    type AppStateStatus = string;

    export interface AppStateStatic {
        currentState: AppStateStatus;
        isAvailable: boolean;

        /**
         * Add a handler to AppState changes by listening to the change event
         * type and providing the handler
         */
        addEventListener(
            type: AppStateEvent,
            listener: (state: AppStateStatus) => void,
        ): NativeEventSubscription;
    }
    export const AppState: AppStateStatic;

    /**
     * Interface for NativeModules which allows to augment NativeModules with type informations.
     * See react-native-sensor-manager for example.
     */
    interface NativeModulesStatic {
        [name: string]: any;
    }

    /**
     * Native Modules written in ObjectiveC/Swift/Java exposed via the RCTBridge
     * Define lazy getters for each module. These will return the module if already loaded, or load it if not.
     * See https://reactnative.dev/docs/native-modules-ios
     * @example
     * const MyModule = NativeModules.ModuleName
     */
    export const NativeModules: NativeModulesStatic;

    export const Alert: any;
}
