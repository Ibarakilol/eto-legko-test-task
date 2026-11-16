import { parseTargetUrl } from './arguments.js';
import { ExitCode, REQUEST_COUNT } from './constants.js';
import type { RequestResult } from './interfaces.js';
import { measureRequest } from './measure.js';
import { getErrorMessage } from './utils.js';

const runRequests = async (url: URL): Promise<RequestResult[]> => {
  const results: RequestResult[] = [];

  for (let index = 1; index <= REQUEST_COUNT; index++) {
    const result = await measureRequest(url).catch((error: unknown) => {
      throw new Error(`Request ${index}/${REQUEST_COUNT} failed: ${getErrorMessage(error)}`);
    });

    results.push(result);
    console.log(
      `Request ${index}/${REQUEST_COUNT}: ${result.bytes} bytes in ${Math.round(result.durationMs)} ms`
    );
  }

  return results;
};

const main = async (): Promise<void> => {
  const url = parseTargetUrl(process.argv.slice(2));

  console.log(`Target: ${url.href}`);

  await runRequests(url);
};

main().catch((error: unknown) => {
  console.error(`Error: ${getErrorMessage(error)}`);
  process.exitCode = ExitCode.FAILURE;
});
