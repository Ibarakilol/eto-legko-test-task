import { BITS_IN_BYTE, BITS_IN_MEGABIT, MS_IN_SECOND } from './constants.js';
import type { RequestResult, Stats } from './interfaces.js';

export const calculateStats = (results: RequestResult[]): Stats => {
  const totalBytes = results.reduce((sum, result) => sum + result.bytes, 0);
  const totalDurationMs = results.reduce((sum, result) => sum + result.durationMs, 0);
  const totalBits = totalBytes * BITS_IN_BYTE;

  return {
    averageDurationMs: totalDurationMs / results.length,
    speedMbps: totalBits / (totalDurationMs / MS_IN_SECOND) / BITS_IN_MEGABIT,
    totalBytes,
  };
};
