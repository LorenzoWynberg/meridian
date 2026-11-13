import { run } from './run';

process.exitCode = run(process.argv.slice(2), {
  stdout: (t) => process.stdout.write(t),
  stderr: (t) => process.stderr.write(t),
  isTTY: Boolean(process.stderr.isTTY),
});
