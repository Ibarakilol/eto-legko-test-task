import { BYTES_IN_MEGABYTE, DECIMAL_PLACES, REQUEST_COUNT } from './constants.js';
import type { RequestResult, Stats } from './interfaces.js';
import { calculateSpeedMbps } from './stats.js';

const formatMegabytes = (bytes: number): string =>
  `${(bytes / BYTES_IN_MEGABYTE).toFixed(DECIMAL_PLACES)} MB`;

const formatMilliseconds = (durationMs: number): string => `${Math.round(durationMs)} ms`;

const formatSpeed = (speedMbps: number): string => `${speedMbps.toFixed(DECIMAL_PLACES)} Mbit/s`;

export const formatRequest = (index: number, result: RequestResult): string => {
  const speed = formatSpeed(calculateSpeedMbps(result.bytes, result.durationMs));

  return `Request ${index}/${REQUEST_COUNT}: ${formatMegabytes(result.bytes)} in ${formatMilliseconds(result.durationMs)} (${speed})`;
};

export const formatSummary = (stats: Stats): string =>
  [
    `Average request time: ${formatMilliseconds(stats.averageDurationMs)}`,
    `Total downloaded: ${formatMegabytes(stats.totalBytes)}`,
    `Download speed: ${formatSpeed(stats.speedMbps)}`,
  ].join('\n');
