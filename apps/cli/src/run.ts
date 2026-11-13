import pkg from '../package.json';
import { format } from './format';
import { byDimension, convert, lookup } from './table';

export interface Io {
  stdout: (text: string) => void;
  stderr: (text: string) => void;
  isTTY: boolean;
}

function usage(): string {
  const groups = byDimension();
  const lines = [
    'Usage: meridian <value> <from> <to>',
    '',
    'Units:',
    ...Object.entries(groups).map(([dim, units]) => `  ${dim}: ${units.join(' ')}`),
    '',
    'Example: meridian 10 km mi',
  ];
  return lines.join('\n') + '\n';
}

export function run(argv: string[], io: Io): number {
  if (argv.includes('--help') || argv.includes('-h')) {
    io.stdout(usage());
    return 0;
  }
  if (argv.includes('--version') || argv.includes('-v')) {
    io.stdout(`${pkg.version}\n`);
    return 0;
  }
  const useColor = io.isTTY && !process.env.NO_COLOR;
  const fail = (msg: string): number => {
    io.stderr((useColor ? `\x1b[31m${msg}\x1b[0m` : msg) + '\n');
    return 2;
  };
  if (argv.some((a) => a.startsWith('-') && !/^-?\.?\d/.test(a)) || argv.length !== 3) {
    io.stderr(usage());
    return 2;
  }
  const [raw, fromSym, toSym] = argv;
  const from = lookup(fromSym);
  if (!from) return fail(`meridian: unknown unit "${fromSym}"`);
  const to = lookup(toSym);
  if (!to) return fail(`meridian: unknown unit "${toSym}"`);
  const value = raw.trim() === '' ? NaN : Number(raw);
  if (!Number.isFinite(value)) return fail(`meridian: not a number: "${raw}"`);
  if (from.dimension !== to.dimension) {
    return fail(
      `meridian: cannot convert ${from.dimension} (${from.symbol}) to ${to.dimension} (${to.symbol})`,
    );
  }
  io.stdout(format(convert(value, from, to)) + '\n');
  return 0;
}
