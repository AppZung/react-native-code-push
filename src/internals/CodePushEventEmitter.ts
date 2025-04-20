import { NativeEventEmitter } from 'react-native';
import { NativeRNAppZungCodePushModule } from './NativeRNAppZungCodePushModule';

export const CodePushEventEmitter = new NativeEventEmitter(NativeRNAppZungCodePushModule);
