export const ALLOWED_PROTOCOLS = ['http:', 'https:'];
export const BITS_IN_BYTE = 8;
export const BITS_IN_MEGABIT = 1_000_000;
export const BYTES_IN_MEGABYTE = 1_000_000;
export const DECIMAL_PLACES = 2;
export const MS_IN_SECOND = 1000;
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
