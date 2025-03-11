import { LogLevel } from '../../enums/LogLevel.enum';
import type { Http } from '../CodePushApiSdk.types';
import { version } from '../version';
import { fetchRetry } from './fetchRetry';
import { log } from './log';

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

    const requestId = Math.round(Math.random() * 10000);
    log(LogLevel.DEBUG, `[${requestId}] Will fetch ${method} ${url}`);

    const response = await fetchRetry(url, {
      method,
      headers,
      body: requestBody,
    });

    const statusCode = response.status;

    log(LogLevel.DEBUG, `[${requestId}] Done fetching with status code ${statusCode}`);

    const body = await response.text();
    return { statusCode, body };
  },
};
