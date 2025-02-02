import { Http } from "code-push/script/acquisition-sdk";
import { version } from "../version";

interface ResponseCallback {
  (error: Error | null, response?: Http.Response): void;
}

export const requestFetchAdapter: Http.Requester = {
  // @ts-expect-error SDK typing is wrong about error callback
  async request(
    verb: Http.Verb,
    url: string,
    requestBody: any | ResponseCallback,
    callback?: ResponseCallback
  ): Promise<void> {
    if (typeof requestBody === "function") {
      callback = requestBody;
      requestBody = null;
    }

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-CodePush-Plugin-Name": "@appzung/react-native-code-push",
      "X-CodePush-Plugin-Version": version,
    };

    if (requestBody && typeof requestBody === "object") {
      requestBody = JSON.stringify(requestBody);
    }

    try {
      const response = await fetch(url, {
        method: getHttpMethodName(verb),
        headers: headers,
        body: requestBody
      });

      const statusCode = response.status;
      const body = await response.text();
      callback!(null, { statusCode, body });
    } catch (err) {
      callback!(err as Error);
    }
  }
};

function getHttpMethodName(verb: Http.Verb): string {
  // Note: This should stay in sync with the enum definition in
  // https://github.com/microsoft/code-push/blob/master/sdk/script/acquisition-sdk.ts#L6
  const methodName = [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "TRACE",
    "OPTIONS",
    "CONNECT",
    "PATCH"
  ][verb];

  if (!methodName) {
    throw new Error("Invalid method name verb");
  }

  return methodName;
}
