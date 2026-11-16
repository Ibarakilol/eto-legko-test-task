import { REQUEST_HEADERS, REQUEST_TIMEOUT_MS } from './constants.js';
import type { RequestResult } from './interfaces.js';

export const measureRequest = async (url: URL): Promise<RequestResult> => {
  const startedAt = performance.now();
  const response = await fetch(url, {
    headers: REQUEST_HEADERS,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('Response has no body');
  }

  let bytes = 0;

  for await (const chunk of response.body) {
    bytes += chunk.byteLength;
  }

  return { bytes, durationMs: performance.now() - startedAt };
};
