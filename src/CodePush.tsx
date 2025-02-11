import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import { AppState } from 'react-native';
import { CheckFrequency } from './enums/CheckFrequency.enum';
import { notifyAppReady } from './notifyAppReady';
import { sync } from './sync';
import type {
  DownloadProgressCallback,
  HandleBinaryVersionMismatchCallback,
  SyncOptions,
  SyncStatusChangedCallback,
} from './types';

export interface CodePushOptions extends SyncOptions {
  /**
   * Specifies when you would like to synchronize updates with the CodePush server.
   *
   * Defaults to CheckFrequency.ON_APP_START.
   */
  checkFrequency?: CheckFrequency;
}

/**
 * Wraps a React component inside a "higher order" React component that knows how to synchronize your app's JavaScript bundle and image assets when it is mounted.
 *
 * Internally, the higher-order component calls `sync` inside its `componentDidMount` lifecycle handle, which in turns performs an update check, downloads the update if it exists and installs the update for you.
 *
 * @param component the React Component that will be decorated
 */
// @ts-ignore
export function withCodePush(component: any): React.FunctionComponent;

/**
 * Wraps a React component inside a "higher order" React component that knows how to synchronize your app's JavaScript bundle and image assets when it is mounted.
 *
 * Internally, the higher-order component calls `sync` inside its `componentDidMount` lifecycle handle, which in turns performs an update check, downloads the update if it exists and installs the update for you.
 *
 * @param options Options used to configure the end-user sync and update experience (e.g. when to check for updates?, show a prompt?, install the update immediately?).
 */
export function withCodePush(options: CodePushOptions): (component: any) => React.FunctionComponent;

export function withCodePush<P extends object>(optionsOrComponent: CodePushOptions | React.ComponentType<P>) {
  const options: CodePushOptions = typeof optionsOrComponent === 'function' ? {} : optionsOrComponent;

  const WithCodePush = (RootComponent: React.ComponentType<P>) => {
    class CodePushComponent extends React.Component<P> {
      rootComponentRef: React.RefObject<any>;

      constructor(props: never) {
        super(props);
        this.rootComponentRef = React.createRef();
      }

      componentDidMount() {
        if (options.checkFrequency === CheckFrequency.MANUAL) {
          notifyAppReady();
        } else {
          const rootComponentInstance = this.rootComponentRef.current;

          let syncStatusCallback: SyncStatusChangedCallback | undefined;
          if (rootComponentInstance && rootComponentInstance.codePushStatusDidChange) {
            syncStatusCallback = rootComponentInstance.codePushStatusDidChange.bind(rootComponentInstance);
          }

          let downloadProgressCallback: DownloadProgressCallback | undefined;
          if (rootComponentInstance && rootComponentInstance.codePushDownloadDidProgress) {
            downloadProgressCallback = rootComponentInstance.codePushDownloadDidProgress.bind(rootComponentInstance);
          }

          let handleBinaryVersionMismatchCallback: HandleBinaryVersionMismatchCallback | undefined;
          if (rootComponentInstance && rootComponentInstance.codePushOnBinaryVersionMismatch) {
            handleBinaryVersionMismatchCallback =
              rootComponentInstance.codePushOnBinaryVersionMismatch.bind(rootComponentInstance);
          }

          sync(options, syncStatusCallback, downloadProgressCallback, handleBinaryVersionMismatchCallback);

          if (options.checkFrequency === CheckFrequency.ON_APP_RESUME) {
            AppState.addEventListener('change', (newState: string) => {
              if (newState === 'active') {
                sync(options, syncStatusCallback, downloadProgressCallback);
              }
            });
          }
        }
      }

      render() {
        const props = { ...this.props };

        // We can set ref property on class components only (not stateless)
        // Check it by render method
        if (RootComponent.prototype && RootComponent.prototype.render) {
          // @ts-ignore
          props.ref = this.rootComponentRef;
        }

        return <RootComponent {...props} />;
      }
    }

    return hoistStatics(CodePushComponent, RootComponent);
  };

  if (typeof optionsOrComponent === 'function') {
    // Infer that the root component was directly passed to us.
    return WithCodePush(optionsOrComponent);
  } else {
    return WithCodePush;
  }
}

export default withCodePush;
