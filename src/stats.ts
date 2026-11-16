import { BITS_IN_BYTE, BITS_IN_MEGABIT, MS_IN_SECOND } from './constants.js';
import type { RequestResult, Stats } from './interfaces.js';

export const calculateSpeedMbps = (bytes: number, durationMs: number): number =>
  (bytes * BITS_IN_BYTE) / (durationMs / MS_IN_SECOND) / BITS_IN_MEGABIT;

export const calculateStats = (results: RequestResult[]): Stats => {
  const totalBytes = results.reduce((sum, result) => sum + result.bytes, 0);
  const totalDurationMs = results.reduce((sum, result) => sum + result.durationMs, 0);

  return {
    averageDurationMs: totalDurationMs / results.length,
    speedMbps: calculateSpeedMbps(totalBytes, totalDurationMs),
    totalBytes,
  };
};
