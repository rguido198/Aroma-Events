// One-off build script: generates public/es/index.html as a real, server-rendered
// Spanish page from the same public/index.html + the `es` translation dictionary
// in translations.json — so both language pages stay in sync from one source of truth.
// Run with: node src/build-es.mjs

import * as cheerio from 'cheerio';
import fs from 'node:fs';

const html = fs.readFileSync('public/index.html', 'utf8');
const translations = JSON.parse(fs.readFileSync('src/translations.json', 'utf8'));
const dict = translations.es;

const $ = cheerio.load(html, { decodeEntities: false });

$('[data-i18n]').each((_, el) => {
  const key = $(el).attr('data-i18n');
  if (dict[key] !== undefined) $(el).html(dict[key]);
});
$('[data-i18n-placeholder]').each((_, el) => {
  const key = $(el).attr('data-i18n-placeholder');
  if (dict[key] !== undefined) $(el).attr('placeholder', dict[key]);
});
$('[data-i18n-alt]').each((_, el) => {
  const key = $(el).attr('data-i18n-alt');
  if (dict[key] !== undefined) $(el).attr('alt', dict[key]);
});
$('[data-i18n-aria]').each((_, el) => {
  const key = $(el).attr('data-i18n-aria');
  if (dict[key] !== undefined) $(el).attr('aria-label', dict[key]);
});

// Language + head metadata
$('html').attr('lang', 'es');
$('title').text(dict['meta.title']);
$('#meta-description').attr('content', dict['meta.description']);
$('#og-title').attr('content', dict['og.title']);
$('#og-description').attr('content', dict['og.description']);
$('meta[property="og:url"]').attr('content', 'https://aromavalledeguadalupe.com/es/');
$('meta[property="og:locale"]').attr('content', 'es_MX');
$('meta[property="og:locale:alternate"]').attr('content', 'en_US');
$('meta[name="twitter:title"]').attr('content', dict['og.title']);
$('meta[name="twitter:description"]').attr('content', dict['og.description']);

// Canonical + hreflang: this page's canonical is itself; reciprocal alternates unchanged.
$('link[rel="canonical"]').attr('href', 'https://aromavalledeguadalupe.com/es/');

// JSON-LD: add inLanguage marker (schema recommends this, low-priority polish already flagged in audit)
$('script[type="application/ld+json"]').each((_, el) => {
  const text = $(el).html();
  try {
    const json = JSON.parse(text);
    if (json['@type'] === 'BanquetHall') {
      json.inLanguage = ['es', 'en'];
      $(el).text(JSON.stringify(json, null, 2));
    }
  } catch (e) { /* second block is an @graph array of ImageObjects, leave as-is */ }
});

// Fix relative asset paths: this file lives one directory deeper (public/es/ vs public/).
let out = $.html();
out = out
  .replace(/href="css\//g, 'href="../css/')
  .replace(/href="assets\//g, 'href="../assets/')
  .replace(/src="assets\//g, 'src="../assets/')
  .replace(/src="js\//g, 'src="../js/')
  .replace(/href="assets\/favicon\.svg"/g, 'href="../assets/favicon.svg"');

// Point links to the programmatic experience/checklist pages at their /es/ mirrors
// (same slug in both locales — see src/build-pages.mjs — so a simple prefix works).
const PROGRAMMATIC_SLUGS = [
  'weddings',
  'wine-dinners-tastings',
  'corporate-retreats',
  'milestone-celebrations',
  'rehearsal-dinners',
  'private-gatherings',
  'event-planning-checklist'
];
for (const slug of PROGRAMMATIC_SLUGS) {
  out = out.replace(new RegExp(`href="/${slug}/"`, 'g'), `href="/es/${slug}/"`);
}

fs.writeFileSync('public/es/index.html', out);
console.log('Wrote public/es/index.html (' + out.length + ' bytes)');
