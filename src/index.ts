import { parseTargetUrl } from './arguments.js';
import { ExitCode, REQUEST_COUNT } from './constants.js';
import { formatRequest, formatSummary } from './format.js';
import type { RequestResult } from './interfaces.js';
import { measureRequest } from './measure.js';
import { calculateStats } from './stats.js';
import { getErrorMessage } from './utils.js';

const runRequests = async (url: URL): Promise<RequestResult[]> => {
  const results: RequestResult[] = [];

  for (let index = 1; index <= REQUEST_COUNT; index++) {
    const result = await measureRequest(url).catch((error: unknown) => {
      throw new Error(`Request ${index}/${REQUEST_COUNT} failed: ${getErrorMessage(error)}`);
    });

    results.push(result);
    console.log(formatRequest(index, result));
  }

  return results;
};

const main = async (): Promise<void> => {
  const url = parseTargetUrl(process.argv.slice(2));

  console.log(`Target: ${url.href}`);

  const results = await runRequests(url);

  console.log(`\n${formatSummary(calculateStats(results))}`);
};

main().catch((error: unknown) => {
  console.error(`Error: ${getErrorMessage(error)}`);
  process.exitCode = ExitCode.FAILURE;
});
