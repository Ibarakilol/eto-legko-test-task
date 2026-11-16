export interface RequestResult {
  bytes: number;
  durationMs: number;
}

export interface Stats {
  averageDurationMs: number;
  speedMbps: number;
  totalBytes: number;
}
