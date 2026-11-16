import { parseTargetUrl } from './arguments.js';
import { ExitCode, REQUEST_COUNT } from './constants.js';
import { getErrorMessage } from './utils.js';

const main = (): void => {
  const url = parseTargetUrl(process.argv.slice(2));

  console.log(`Target: ${url.href}`);
  console.log(`Planned requests: ${REQUEST_COUNT}`);
};

try {
  main();
} catch (error) {
  console.error(`Error: ${getErrorMessage(error)}`);
  process.exitCode = ExitCode.FAILURE;
}
