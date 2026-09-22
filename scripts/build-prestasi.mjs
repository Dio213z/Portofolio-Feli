// Build tanpa dependensi: salin website dan buat daftar gambar saat deploy.
import { readdir, mkdir, cp, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
const entries = await readdir(path.join(root, "asset"), { withFileTypes: true });
const files = entries.filter(entry => entry.isFile() && /^prestasi[1-9]\d*\.(png|jpe?g)$/i.test(entry.name)).map(entry => entry.name).sort((a,b) => {
  const left = BigInt(a.match(/\d+/)[0]), right = BigInt(b.match(/\d+/)[0]);
  return left < right ? -1 : left > right ? 1 : a.localeCompare(b);
});
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ["index.html", "prestasi.html", "style.css", "config.js", "common.js", "experience.js", "script.js", "prestasi.js", "assets", "asset"]) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
await writeFile(path.join(output, "prestasi-data.js"), "window.PRESTASI_DATA = " + JSON.stringify({generated: true, files}) + ";\n");
console.log("Website siap di dist. Ditemukan " + files.length + " gambar prestasi.");
