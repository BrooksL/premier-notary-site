// Builds dist/ from site/.
//   node scripts/build.mjs preview   adds noindex, a disallow-all robots.txt and the preview layer
//   node scripts/build.mjs launch    clean output for the public site
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const mode = process.argv[2] === 'launch' ? 'launch' : 'preview';
const root = new URL('../', import.meta.url);
const site = new URL('site/', root);
const out = new URL('dist/', root);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(site, out, { recursive: true });

const indexUrl = new URL('index.html', out);
let html = await readFile(indexUrl, 'utf8');

if (mode === 'preview') {
  await mkdir(new URL('preview/', out), { recursive: true });
  await cp(new URL('preview/preview.css', root), new URL('preview/preview.css', out));
  await cp(new URL('preview/preview.js', root), new URL('preview/preview.js', out));
  await writeFile(new URL('robots.txt', out), 'User-agent: *\nDisallow: /\n');

  const inject = [
    '<meta name="robots" content="noindex, nofollow">',
    '<link rel="stylesheet" href="preview/preview.css">',
    '<script src="preview/preview.js" defer></script>',
  ].join('\n');
  if (!html.includes('</head>')) throw new Error('index.html has no </head>');
  html = html.replace('</head>', `${inject}\n</head>`);
} else {
  await writeFile(new URL('robots.txt', out), 'User-agent: *\nAllow: /\n');
}

await writeFile(indexUrl, html);
console.log(`Built the ${mode} site into dist/`);
