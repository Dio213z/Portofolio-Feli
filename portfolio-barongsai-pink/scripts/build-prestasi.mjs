// Struktur build project awal dipertahankan. Semua URL kini di config.js.
import { mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'prestasi.html', 'style.css', 'config.js', 'common.js', 'experience.js', 'script.js', 'prestasi.js', 'assets', 'asset']) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
console.log('Website Pink Barongsai siap di dist. Foto dan prestasi diatur melalui config.js.');
