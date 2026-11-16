export const ALLOWED_PROTOCOLS = ['http:', 'https:'];
export const REQUEST_COUNT = 10;
export const REQUEST_TIMEOUT_MS = 60_000;
export const USAGE = 'Usage: yarn start <url>';

export const ExitCode = {
  FAILURE: 1,
  SUCCESS: 0,
} as const;

export const REQUEST_HEADERS = {
  'accept-encoding': 'identity',
};
