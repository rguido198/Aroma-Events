// Cache-busting: public/_headers sets a 7-day Cache-Control on /css/* and /js/*, and
// none of those filenames change between deploys. Without a version query string, any
// browser that cached the old stylesheet keeps serving it on newly-visited pages for up
// to a week — the new page ships classes the cached CSS doesn't have yet, so layout breaks
// (fixed header overlapping content, missing aspect-ratio boxes, etc.).
//
// This stamps a short content-hash query string onto the stylesheet/script references in
// public/index.html, and records the versions in src/asset-versions.json so
// src/build-pages.mjs can apply the same versions to the programmatic pages.
// Run after build:css and build:js, before build-pages.mjs and build:es.

import fs from 'node:fs';
import crypto from 'node:crypto';

function hashFile(path) {
  const buf = fs.readFileSync(path);
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
}

const versions = {
  css: hashFile('public/css/styles.css'),
  i18n: hashFile('public/js/i18n.js'),
  main: hashFile('public/js/main.js')
};

let html = fs.readFileSync('public/index.html', 'utf8');
html = html
  .replace(/href="css\/styles\.css(\?v=[a-f0-9]+)?"/, `href="css/styles.css?v=${versions.css}"`)
  .replace(/src="js\/i18n\.js(\?v=[a-f0-9]+)?"/, `src="js/i18n.js?v=${versions.i18n}"`)
  .replace(/src="js\/main\.js(\?v=[a-f0-9]+)?"/, `src="js/main.js?v=${versions.main}"`);
fs.writeFileSync('public/index.html', html);

fs.writeFileSync('src/asset-versions.json', JSON.stringify(versions, null, 2) + '\n');

console.log('Stamped asset versions:', versions);
