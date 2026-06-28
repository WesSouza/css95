import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'dist/style.css',
  'dist/style.module.css',
  'dist/tokens.css',
  'dist/classes.js',
  'dist/classes.d.ts',
  'dist/solid/index.js',
  'dist/solid/index.d.ts',
  'dist/react/index.js',
  'dist/react/index.d.ts',
];

for (const file of requiredFiles) {
  await access(resolve(root, file));
}

const css = await readFile(resolve(root, 'dist/style.css'), 'utf8');
for (const fragment of ['.Window', '.Button']) {
  if (!css.includes(fragment)) {
    throw new Error(`dist/style.css is missing ${fragment}`);
  }
}

console.log('Smoke check passed.');
