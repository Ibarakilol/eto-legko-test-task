import { parseTargetUrl } from './arguments.js';
import { ExitCode } from './constants.js';
import { measureRequest } from './measure.js';
import { getErrorMessage } from './utils.js';

const main = async (): Promise<void> => {
  const url = parseTargetUrl(process.argv.slice(2));

  console.log(`Target: ${url.href}`);

  const result = await measureRequest(url);

  console.log(result);
};

main().catch((error: unknown) => {
  console.error(`Error: ${getErrorMessage(error)}`);
  process.exitCode = ExitCode.FAILURE;
});
