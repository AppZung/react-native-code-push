declare module 'react-native' {
  export type PlatformStatic = {
    OS: 'ios' | 'android' | 'windows';
  };
  export const Platform: PlatformStatic;

  export interface NativeEventSubscription {
    remove(): void;
  }
  export class NativeEventEmitter {
    constructor(nativeModule?: any);
    addListener(eventType: string, listener: (event: any) => void, context?: Object): NativeEventSubscription;
  }

  type AppStateStatus = string;
  export interface AppStateStatic {
    currentState: AppStateStatus;
    addEventListener(type: AppStateEvent, listener: (state: AppStateStatus) => void): NativeEventSubscription;
  }
  export const AppState: AppStateStatic;

  export interface AlertButton {
    text?: string;
    onPress?: () => void;
  }
  interface AlertStatic {
    alert(title: string, message?: string, buttons?: AlertButton[]): void;
  }
  export const Alert: AlertStatic;

  export interface TurboModule {
    getConstants?(): {};
  }
}
