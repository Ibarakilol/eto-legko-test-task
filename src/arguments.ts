import { ALLOWED_PROTOCOLS, USAGE } from './constants.js';

export const parseTargetUrl = (args: string[]): URL => {
  const [rawUrl] = args;

  if (!rawUrl) {
    throw new Error(`Missing URL\n${USAGE}`);
  }

  if (!URL.canParse(rawUrl)) {
    throw new Error(`Invalid URL: ${rawUrl}\n${USAGE}`);
  }

  const url = new URL(rawUrl);

  if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
    throw new Error(`Unsupported protocol "${url.protocol}", expected http: or https:`);
  }

  return url;
};
