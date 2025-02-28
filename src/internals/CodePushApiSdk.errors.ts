export class CodePushError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CodePushError';
  }
}

export class CodePushHttpError extends CodePushError {
  constructor(
    readonly url: string,
    readonly statusCode: number,
    message: string,
  ) {
    super(message);

    if (statusCode === 0) {
      this.message = `Couldn't send request to ${url}, xhr.statusCode = 0 was returned. One of the possible reasons for that might be connection problems. Please, check your internet connection.`;
    }

    this.name = 'CodePushHttpError';
  }
}
