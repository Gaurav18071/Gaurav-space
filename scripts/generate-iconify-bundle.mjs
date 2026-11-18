/**
 * Generates an offline Iconify bundle so icons render without hitting
 * api.iconify.design at runtime.
 */
import { readFile, writeFile, readdir } from 'fs/promises';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'components/IconifyLoader/iconify-bundle.json');
const PREFIXES_OUT = path.join(ROOT, 'components/IconifyLoader/iconify-prefixes.json');
const ICON_RE = /(["'])([a-z0-9]+(?:-[a-z0-9]+)*):([a-z0-9]+(?:-[a-z0-9]+)*)\1/g;

async function collectFiles(dir, exts, files = []) {
  try {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await collectFiles(full, exts, files);
      else if (exts.some((e) => entry.name.endsWith(e))) files.push(full);
    }
  } catch {}
  return files;
}

const sources = [
  path.join(ROOT, 'content/content.json'),
  ...(await collectFiles(path.join(ROOT, 'components'), ['.tsx', '.ts'])),
  ...(await collectFiles(path.join(ROOT, 'app'), ['.tsx', '.ts'])),
];

const byPrefix = new Map();
for (const file of sources) {
  try {
    const text = await readFile(file, 'utf-8');
    for (const [, , prefix, name] of text.matchAll(ICON_RE)) {
      if (!byPrefix.has(prefix)) byPrefix.set(prefix, new Set());
      byPrefix.get(prefix).add(name);
    }
  } catch {}
}

let previous = [];
try {
  previous = JSON.parse(await readFile(OUT, 'utf-8'));
} catch {}

function fromPreviousBundle(prefix, names) {
  const data = previous.find((c) => c.prefix === prefix);
  if (!data) return null;
  return data;
}

async function fromApi(prefix, names) {
  try {
    const url = `https://api.iconify.design/${prefix}.json?icons=${[...names].sort().join(',')}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.not_found?.length) console.warn(`${prefix}: not found: ${data.not_found.join(', ')}`);
    delete data.not_found;
    return Object.keys(data.icons || {}).length ? data : null;
  } catch (err) {
    return null;
  }
}

const collections = [];
for (const [prefix, names] of [...byPrefix.entries()].sort()) {
  let prevData = fromPreviousBundle(prefix, names);
  let apiData = await fromApi(prefix, names);

  let merged = null;
  if (prevData && apiData) {
    merged = {
      ...prevData,
      ...apiData,
      icons: {
        ...(prevData.icons || {}),
        ...(apiData.icons || {}),
      },
      aliases: {
        ...(prevData.aliases || {}),
        ...(apiData.aliases || {}),
      },
    };
  } else {
    merged = apiData || prevData;
  }

  if (merged && merged.icons && Object.keys(merged.icons).length) {
    collections.push(merged);
  } else {
    console.warn(`skip ${prefix}: no icon data`);
  }
}

await writeFile(OUT, JSON.stringify(collections, null, 2));
await writeFile(
  PREFIXES_OUT,
  `${JSON.stringify(
    collections.map((c) => c.prefix),
    null,
    2
  )}\n`
);
const bytes = (await readFile(OUT)).length;
console.log(
  `Wrote ${collections.length} collections (${collections.reduce(
    (n, c) => n + Object.keys(c.icons).length,
    0
  )} icons, ${(bytes / 1024).toFixed(1)} KB) to ${path.relative(ROOT, OUT)}`
);
