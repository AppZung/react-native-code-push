import type { Http } from '../CodePushApiSdk.types';
import { version } from '../version';
import { fetchRetry } from './fetchRetry';

export const requestFetchAdapter: Http.Requester = {
  async request(method, url, requestBody) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CodePush-Plugin-Name': '@appzung/react-native-code-push',
      'X-CodePush-Plugin-Version': version,
    };

    if (requestBody && typeof requestBody === 'object') {
      requestBody = JSON.stringify(requestBody);
    }

    const response = await fetchRetry(url, {
      method,
      headers,
      body: requestBody,
    });

    const statusCode = response.status;
    const body = await response.text();
    return { statusCode, body };
  },
};
