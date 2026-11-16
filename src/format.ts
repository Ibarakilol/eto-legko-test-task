import { BYTES_IN_MEGABYTE, DECIMAL_PLACES, REQUEST_COUNT } from './constants.js';
import type { RequestResult, Stats } from './interfaces.js';

const formatMegabytes = (bytes: number): string =>
  `${(bytes / BYTES_IN_MEGABYTE).toFixed(DECIMAL_PLACES)} MB`;

const formatMilliseconds = (durationMs: number): string => `${Math.round(durationMs)} ms`;

export const formatRequest = (index: number, result: RequestResult): string =>
  `Request ${index}/${REQUEST_COUNT}: ${formatMegabytes(result.bytes)} in ${formatMilliseconds(result.durationMs)}`;

export const formatSummary = (stats: Stats): string =>
  [
    `Average request time: ${formatMilliseconds(stats.averageDurationMs)}`,
    `Total downloaded: ${formatMegabytes(stats.totalBytes)}`,
    `Download speed: ${stats.speedMbps.toFixed(DECIMAL_PLACES)} Mbit/s`,
  ].join('\n');
