export async function fetchRetry(url: string, options: FetchRetryOptions = {}, attempt = 0): Promise<Response> {
  const {
    maxRetries = 3,
    initialBackoff = 1000,
    backoffMultiplier = 2,
    maxRetryDelay = 30000,
    ...fetchOptions
  } = options;

  try {
    const response = await fetch(url, fetchOptions);
    if (response.ok || !(response.status === 429 || response.status >= 500)) {
      return response;
    }

    if (attempt >= maxRetries) {
      return response;
    }

    const retryAfter = parseRetryAfterHeader(response);
    if (retryAfter && retryAfter > maxRetryDelay) {
      return response;
    }

    const delay = retryAfter ?? addJitter(initialBackoff * Math.pow(backoffMultiplier, attempt));

    await new Promise((resolve) => setTimeout(resolve, delay));

    return fetchRetry(url, options, attempt + 1);
  } catch (error) {
    if (attempt >= maxRetries) {
      throw error;
    }

    const delay = addJitter(initialBackoff * Math.pow(backoffMultiplier, attempt));

    await new Promise((resolve) => setTimeout(resolve, delay));

    return fetchRetry(url, options, attempt + 1);
  }
}

interface FetchRetryOptions extends RequestInit {
  maxRetries?: number;
  initialBackoff?: number;
  backoffMultiplier?: number;
  maxRetryDelay?: number;
}

function parseRetryAfterHeader(response: Response): number | null {
  const retryAfter = response.headers.get('Retry-After');
  if (!retryAfter) {
    return null;
  }

  if (!isNaN(Number(retryAfter))) {
    return parseInt(retryAfter, 10) * 1000;
  }

  try {
    const retryDate = new Date(retryAfter).getTime();
    const now = Date.now();
    return retryDate > now ? retryDate - now : 0;
  } catch (e) {
    return null;
  }
}

function addJitter(delay: number): number {
  const jitterFactor = 0.5 + Math.random() * 0.5;
  return Math.floor(delay * jitterFactor);
}
