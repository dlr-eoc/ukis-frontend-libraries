import * as NG from '@angular/cli';
const args = process.argv.slice(2);
export default async function runNG() {
  const options = {
    cliArgs: args
  };
  /**
   * running multiple NG.default (Promise) with await/then is not working somehow, so the next command is run to early before everything is finished
   * -> to build all projects in a sequence use a new Child process for each
   * e.g. const child = fork(`${__dirname}/run-ng.js`, cliArgs); and check for the child event to start the next one
   */
  const maybeExitCode = await NG.default(options);
  if (typeof maybeExitCode === 'number') {
    process.exit(maybeExitCode);
  }
}
runNG();
