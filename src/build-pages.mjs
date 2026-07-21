// Programmatic pages: 6 "Experiences" pages + 1 "Event Planning Checklist" page, in EN + ES.
// Content lives in src/pages-content.json (unique per page — see seo-programmatic quality gates).
// Shared chrome (header/nav/footer/icon sprite) mirrors public/index.html so these pages
// look and behave like the rest of the site. Run with: node src/build-pages.mjs

import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://aromavalledeguadalupe.com';

const translations = JSON.parse(fs.readFileSync('src/translations.json', 'utf8'));
const content = JSON.parse(fs.readFileSync('src/pages-content.json', 'utf8'));

const NAV = {
  en: translations.en,
  es: translations.es
};

function homeUrl(lang) {
  return lang === 'es' ? `${SITE}/es/` : `${SITE}/`;
}

function pageUrl(lang, slug) {
  return lang === 'es' ? `${SITE}/es/${slug}/` : `${SITE}/${slug}/`;
}

function outDir(lang, slug) {
  return lang === 'es' ? path.join('public', 'es', slug) : path.join('public', slug);
}

// ---------- Icon sprite + wine-stain ring defs, copied verbatim from public/index.html ----------
const ICON_DEFS = `
  <svg width="0" height="0" class="absolute" aria-hidden="true">
    <defs>
      <filter id="ringWobble" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="7"/>
      </filter>
      <filter id="stainWobbleSoft" x="-60%" y="-60%" width="220%" height="220%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="3" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="16"/>
      </filter>
      <filter id="stainWobbleMid" x="-60%" y="-60%" width="220%" height="220%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="11" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="11"/>
      </filter>
      <filter id="stainWobbleSharp" x="-60%" y="-60%" width="220%" height="220%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="19" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="9"/>
      </filter>
      <symbol id="wineStainRing" viewBox="0 0 200 200">
        <circle cx="102" cy="101" r="75" fill="none" stroke="#D3A08D" stroke-width="28" stroke-linecap="round" stroke-dasharray="430 60" filter="url(#stainWobbleSoft)" opacity="0.4"/>
        <circle cx="98" cy="100" r="69" fill="none" stroke="#96453F" stroke-width="15" stroke-linecap="round" stroke-dasharray="410 25" filter="url(#stainWobbleMid)" opacity="0.8"/>
        <circle cx="100" cy="99" r="67" fill="none" stroke="#4A161C" stroke-width="8" stroke-linecap="round" stroke-dasharray="365 55" filter="url(#stainWobbleSharp)" opacity="0.92"/>
      </symbol>
      <symbol id="icon-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
      <symbol id="icon-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
      <symbol id="icon-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
      <symbol id="icon-mail" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 6.5l7.5 6 7.5-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
      <symbol id="icon-calendar" viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="15" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 9.5h16M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
      <symbol id="icon-users" viewBox="0 0 24 24"><circle cx="9" cy="8.5" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15.5 6.7a3 3 0 0 1 0 5.7M18 19c0-2.4-1.6-4.3-3.8-4.9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
      <symbol id="icon-glass" viewBox="0 0 24 24"><path d="M7 3.5h10l-1.3 8.2a3.7 3.7 0 0 1-7.4 0L7 3.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 13.5V20M8.5 20h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
      <symbol id="icon-leaf" viewBox="0 0 24 24"><path d="M5 19c-1-6 2.5-13 14-14-1 11-8 14-14 14Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 18c3-3 6-6 12-12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
      <symbol id="icon-sparkle" viewBox="0 0 24 24"><path d="M12 3.5l1.6 5.4 5.4 1.6-5.4 1.6L12 17.5l-1.6-5.4-5.4-1.6 5.4-1.6L12 3.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
      <symbol id="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2.5v3M12 18.5v3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M2.5 12h3M18.5 12h3M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
      <symbol id="icon-instagram" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="7" r="0.9" fill="currentColor"/></symbol>
      <symbol id="icon-facebook" viewBox="0 0 24 24"><path d="M14 21v-7h2.4l.4-3H14V9c0-.9.2-1.5 1.6-1.5H17V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8.5v3H11v7h3Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>
      <symbol id="icon-arrow-down" viewBox="0 0 24 24"><path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    </defs>
  </svg>`;

// ---------- Header / mobile nav / footer, adapted for a fixed non-anchor home URL ----------
function header(lang) {
  const t = NAV[lang];
  const home = homeUrl(lang);
  return `
  <header id="site-header" class="fixed top-0 inset-x-0 z-30">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
      <a href="${home}" class="flex items-center gap-3 group" aria-label="${t['aria.home']}">
        <svg viewBox="0 0 200 200" class="w-8 h-8 shrink-0"><use href="#wineStainRing"/></svg>
        <span class="leading-tight">
          <span class="block font-display font-medium text-lg tracking-[0.3em] text-ink">AROMA</span>
          <span class="block font-display text-[9px] tracking-[0.25em] text-wine -mt-0.5">VALLE DE GUADALUPE</span>
        </span>
      </a>
      <nav class="hidden md:flex items-center gap-9 font-display text-xs tracking-[0.2em] uppercase text-ink" aria-label="${t['aria.primaryNav']}">
        <a href="${home}#space" class="hover:text-wine transition-colors duration-200">${t['nav.space']}</a>
        <a href="${home}#experiences" class="hover:text-wine transition-colors duration-200">${t['nav.experiences']}</a>
        <a href="${home}#gallery" class="hover:text-wine transition-colors duration-200">${t['nav.gallery']}</a>
        <a href="${home}#location" class="hover:text-wine transition-colors duration-200">${t['nav.location']}</a>
      </nav>
      <div class="hidden md:flex items-center gap-5">
        <div class="flex items-center font-display text-xs tracking-[0.1em]" role="group" aria-label="${t['aria.langSwitch']}">
          <button type="button" data-lang-btn="en" aria-pressed="${lang === 'en'}" class="min-w-[32px] h-11 px-1 ${lang === 'en' ? 'text-wine' : 'text-ink/40'} hover:text-wine transition-colors">EN</button>
          <span class="text-ink/30" aria-hidden="true">/</span>
          <button type="button" data-lang-btn="es" aria-pressed="${lang === 'es'}" class="min-w-[32px] h-11 px-1 ${lang === 'es' ? 'text-wine' : 'text-ink/40'} hover:text-wine transition-colors">ES</button>
        </div>
        <a href="${home}#inquire" class="inline-flex items-center h-11 px-6 bg-wine text-cream font-display text-xs tracking-[0.2em] uppercase hover:bg-wine-dark transition-colors duration-200">${t['nav.cta']}</a>
      </div>
      <button id="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${t['aria.openMenu']}" class="md:hidden w-11 h-11 flex items-center justify-center text-ink">
        <svg class="w-6 h-6"><use href="#icon-menu"/></svg>
      </button>
    </div>
  </header>

  <div id="mobile-nav" data-open="false" class="fixed inset-0 z-40 bg-cream flex flex-col" role="dialog" aria-modal="true" aria-label="${t['aria.mobileMenu']}">
    <div class="flex items-center justify-between h-20 px-6">
      <span class="font-display tracking-[0.3em] text-lg">AROMA</span>
      <button id="menu-close" type="button" aria-label="${t['aria.closeMenu']}" class="w-11 h-11 flex items-center justify-center text-ink">
        <svg class="w-6 h-6"><use href="#icon-close"/></svg>
      </button>
    </div>
    <nav class="flex-1 flex flex-col items-center justify-center gap-8 font-display text-xl tracking-[0.15em] uppercase" aria-label="${t['aria.mobileNav']}">
      <a href="${home}#space" class="min-h-[44px] flex items-center hover:text-wine transition-colors">${t['nav.space']}</a>
      <a href="${home}#experiences" class="min-h-[44px] flex items-center hover:text-wine transition-colors">${t['nav.experiences']}</a>
      <a href="${home}#gallery" class="min-h-[44px] flex items-center hover:text-wine transition-colors">${t['nav.gallery']}</a>
      <a href="${home}#location" class="min-h-[44px] flex items-center hover:text-wine transition-colors">${t['nav.location']}</a>
      <a href="${home}#inquire" class="mt-4 inline-flex items-center h-12 px-8 bg-wine text-cream text-sm tracking-[0.2em]">${t['nav.cta']}</a>
      <div class="mt-6 flex items-center gap-2 font-display text-sm tracking-[0.1em] normal-case" role="group" aria-label="${t['aria.langSwitch']}">
        <button type="button" data-lang-btn="en" aria-pressed="${lang === 'en'}" class="min-w-[44px] h-11 ${lang === 'en' ? 'text-wine' : 'text-ink/40'} hover:text-wine transition-colors">EN</button>
        <span class="text-ink/30" aria-hidden="true">/</span>
        <button type="button" data-lang-btn="es" aria-pressed="${lang === 'es'}" class="min-w-[44px] h-11 ${lang === 'es' ? 'text-wine' : 'text-ink/40'} hover:text-wine transition-colors">ES</button>
      </div>
    </nav>
  </div>`;
}

function footer(lang) {
  const t = NAV[lang];
  const home = homeUrl(lang);
  return `
  <footer class="py-16 border-t border-ink/10">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
      <div>
        <div class="flex items-center gap-3">
          <svg viewBox="0 0 200 200" class="w-7 h-7"><use href="#wineStainRing"/></svg>
          <span class="leading-tight">
            <span class="block font-display font-medium tracking-[0.3em] text-base">AROMA</span>
            <span class="block font-display text-[9px] tracking-[0.25em] text-wine -mt-0.5">VALLE DE GUADALUPE</span>
          </span>
        </div>
        <p class="mt-4 text-sm text-ink/60 max-w-xs">${t['footer.tagline']}</p>
        <div class="mt-6 flex items-center gap-4 text-ink/60">
          <a href="#" aria-label="Instagram" class="w-11 h-11 flex items-center justify-center hover:text-wine transition-colors"><svg class="w-5 h-5"><use href="#icon-instagram"/></svg></a>
          <a href="#" aria-label="Facebook" class="w-11 h-11 flex items-center justify-center hover:text-wine transition-colors"><svg class="w-5 h-5"><use href="#icon-facebook"/></svg></a>
        </div>
      </div>
      <nav class="grid grid-cols-2 gap-x-12 font-display text-xs tracking-[0.15em] uppercase text-ink/70" aria-label="${t['aria.footerNav']}">
        <a href="${home}#space" class="min-h-11 flex items-center hover:text-wine transition-colors">${t['nav.space']}</a>
        <a href="${home}#experiences" class="min-h-11 flex items-center hover:text-wine transition-colors">${t['nav.experiences']}</a>
        <a href="${home}#gallery" class="min-h-11 flex items-center hover:text-wine transition-colors">${t['nav.gallery']}</a>
        <a href="${home}#location" class="min-h-11 flex items-center hover:text-wine transition-colors">${t['nav.location']}</a>
        <a href="${home}#inquire" class="min-h-11 flex items-center hover:text-wine transition-colors">${t['nav.inquire']}</a>
      </nav>
    </div>
    <div class="max-w-7xl mx-auto px-6 lg:px-10 mt-12 pt-6 border-t border-ink/10 text-xs text-ink/50">
      &copy; <span id="current-year"></span> Aroma Events. ${t['footer.rights']}
    </div>
  </footer>`;
}

function breadcrumbNav(lang, crumbs) {
  // crumbs: [{name, url}] — last crumb has no url (current page)
  const label = lang === 'es' ? 'Ruta de navegación' : 'Breadcrumb';
  const items = crumbs.map((c, i) => {
    const sep = i > 0 ? '<span class="mx-2 text-ink/30" aria-hidden="true">/</span>' : '';
    const el = c.url
      ? `<a href="${c.url}" class="hover:text-wine transition-colors">${c.name}</a>`
      : `<span class="text-ink/70" aria-current="page">${c.name}</span>`;
    return sep + el;
  }).join('');
  return `<nav aria-label="${label}" class="text-xs font-display tracking-[0.1em] uppercase text-ink/50">${items}</nav>`;
}

function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url || undefined
    }))
  };
}

function spaceCard(lang, key) {
  const s = content.spaces[key];
  const t = s[lang];
  return `
        <a href="${homeUrl(lang)}#space" class="block bg-cream-alt p-6 hover:bg-cream transition-colors">
          <div class="aspect-[4/3] mb-4 relative overflow-hidden">
            <img src="/assets/photos/${s.image}" alt="${t.name}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
          </div>
          <svg class="w-5 h-5 text-wine mb-3"><use href="#${s.icon}"/></svg>
          <h3 class="font-display text-base tracking-[0.1em] uppercase">${t.name}</h3>
          <div class="mt-2 flex items-center gap-2 text-xs font-display tracking-[0.15em] uppercase text-ink/60">
            <svg class="w-4 h-4"><use href="#icon-users"/></svg><span>${t.guests}</span>
          </div>
        </a>`;
}

function faqSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

const STRINGS = {
  en: { recommended: 'Recommended Spaces', goodToKnow: 'Good to Know', faq: 'Frequently Asked Questions', related: 'You Might Also Like', checklistCallout: 'Planning the details?', checklistCalloutBody: 'Our event planning checklist walks through what to line up and when.', checklistLink: 'See the checklist', cta: 'Plan Your Event', ctaBody: "Tell us a little about your occasion and we'll follow up to talk dates, spaces, and what's possible.", home: 'Home', experiencesCrumb: 'Experiences', occasions: 'Plan by Occasion' },
  es: { recommended: 'Espacios Recomendados', goodToKnow: 'Datos Útiles', faq: 'Preguntas Frecuentes', related: 'También Te Puede Interesar', checklistCallout: '¿Planeando los detalles?', checklistCalloutBody: 'Nuestra lista de planificación de eventos te guía sobre qué organizar y cuándo.', checklistLink: 'Ver la lista', cta: 'Planea tu Evento', ctaBody: 'Cuéntanos un poco sobre tu ocasión y te contactaremos para hablar de fechas, espacios y posibilidades.', home: 'Inicio', experiencesCrumb: 'Experiencias', occasions: 'Planea Según tu Ocasión' }
};

function experienceByKey(key) {
  return content.experiences.find(e => e.key === key);
}

function renderExperiencePage(exp, lang) {
  const t = exp[lang];
  const s = STRINGS[lang];
  const home = homeUrl(lang);
  const url = pageUrl(lang, exp.slugEn);
  const crumbs = [
    { name: s.home, url: home },
    { name: s.experiencesCrumb, url: `${home}#experiences` },
    { name: t.eyebrow }
  ];

  const sectionsHtml = t.sections.map(sec => `
        <h2 class="mt-12 font-display text-xl tracking-[0.08em] uppercase">${sec.heading}</h2>
        ${sec.paragraphs.map(p => `<p class="mt-4 text-ink/80 leading-relaxed">${p}</p>`).join('\n')}`).join('\n');

  const spacesHtml = exp.recommendedSpaces.map(k => spaceCard(lang, k)).join('\n');

  const goodToKnowHtml = t.goodToKnow.map(item => `<li class="flex items-start gap-3"><svg class="w-4 h-4 text-wine shrink-0 mt-1"><use href="#icon-leaf"/></svg><span>${item}</span></li>`).join('\n');

  const faqHtml = t.faq.map(f => `
        <details class="group border-b border-ink/10 py-5">
          <summary class="flex items-center justify-between cursor-pointer font-display text-sm tracking-[0.05em] uppercase list-none">
            <span>${f.q}</span>
            <svg class="w-4 h-4 text-wine shrink-0 transition-transform group-open:rotate-180"><use href="#icon-arrow-down"/></svg>
          </summary>
          <p class="mt-3 text-sm text-ink/70 leading-relaxed">${f.a}</p>
        </details>`).join('\n');

  const relatedHtml = exp.relatedExperiences.map(k => {
    const rel = experienceByKey(k);
    const rt = rel[lang];
    return `<a href="${pageUrl(lang, rel.slugEn)}" class="block bg-cream-alt p-6 hover:bg-cream transition-colors">
          <svg class="w-6 h-6 text-wine mb-3"><use href="#${rel.icon}"/></svg>
          <h3 class="font-display text-base tracking-[0.1em] uppercase">${rt.h1}</h3>
          <p class="mt-2 text-sm text-ink/70 leading-relaxed">${rt.subhead}</p>
        </a>`;
  }).join('\n');

  const checklistUrl = pageUrl(lang, content.checklist.slugEn);

  const body = `
    <section class="pt-32 pb-4 sm:pt-40">
      <div class="max-w-3xl mx-auto px-6 lg:px-10">
        ${breadcrumbNav(lang, crumbs)}
        <span class="mt-6 block font-display text-xs tracking-[0.3em] uppercase text-wine">${t.eyebrow}</span>
        <h1 class="mt-4 font-display font-light uppercase tracking-[0.04em] text-3xl sm:text-4xl lg:text-5xl leading-tight">${t.h1}</h1>
        <p class="mt-6 text-base sm:text-lg text-ink/80 leading-relaxed max-w-2xl">${t.subhead}</p>
      </div>
    </section>

    <section class="pb-24 sm:pb-32">
      <div class="max-w-3xl mx-auto px-6 lg:px-10">
        <div class="aspect-[16/9] mt-4 mb-10 relative overflow-hidden">
          <img src="/assets/photos/${t.heroImage}" alt="${t.heroAlt}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
        </div>

        <p class="text-ink/80 leading-relaxed text-lg">${t.intro}</p>
        ${sectionsHtml}

        <h2 class="mt-12 font-display text-xl tracking-[0.08em] uppercase">${s.recommended}</h2>
        <p class="mt-4 text-ink/80 leading-relaxed">${t.recommendedIntro}</p>
        <div class="mt-8 grid sm:grid-cols-2 gap-6">
          ${spacesHtml}
        </div>

        <h2 class="mt-12 font-display text-xl tracking-[0.08em] uppercase">${s.goodToKnow}</h2>
        <ul class="mt-6 space-y-3 text-ink/80 leading-relaxed">
          ${goodToKnowHtml}
        </ul>

        <h2 class="mt-12 font-display text-xl tracking-[0.08em] uppercase">${s.faq}</h2>
        <div class="mt-6">
          ${faqHtml}
        </div>

        <div class="mt-12 bg-cream-alt p-8">
          <p class="font-display text-sm tracking-[0.1em] uppercase text-wine">${s.checklistCallout}</p>
          <p class="mt-2 text-ink/80 leading-relaxed">${s.checklistCalloutBody}</p>
          <a href="${checklistUrl}" class="mt-4 inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-wine hover:text-wine-dark transition-colors">
            <span>${s.checklistLink}</span>
            <svg class="w-4 h-4 -rotate-90"><use href="#icon-arrow-down"/></svg>
          </a>
        </div>

        <h2 class="mt-12 font-display text-xl tracking-[0.08em] uppercase">${s.related}</h2>
        <div class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${relatedHtml}
        </div>

        <div class="mt-16 bg-wine text-cream p-8 sm:p-10 text-center">
          <h2 class="font-display font-light uppercase tracking-[0.04em] text-2xl">${s.cta}</h2>
          <p class="mt-3 text-cream/80 leading-relaxed max-w-md mx-auto">${s.ctaBody}</p>
          <a href="${home}#inquire" class="mt-6 inline-flex items-center h-12 px-8 bg-cream text-wine font-display text-xs tracking-[0.2em] uppercase hover:bg-cream-alt transition-colors duration-200">${s.cta}</a>
        </div>
      </div>
    </section>`;

  const jsonLd = [
    breadcrumbSchema(crumbs.map(c => ({ ...c, url: c.url }))),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t.h1,
      description: t.metaDescription,
      url,
      provider: { '@type': 'BanquetHall', name: 'Aroma Events Valle de Guadalupe', url: SITE },
      areaServed: { '@type': 'Place', name: 'Valle de Guadalupe, Baja California, Mexico' }
    },
    faqSchema(t.faq)
  ];

  return renderShell({
    lang, url,
    title: t.metaTitle,
    description: t.metaDescription,
    ogDescription: t.ogDescription,
    ogImage: `/assets/photos/${t.heroImage}`,
    alternateEn: pageUrl('en', exp.slugEn),
    alternateEs: pageUrl('es', exp.slugEn),
    jsonLd,
    body
  });
}

function renderChecklistPage(lang) {
  const c = content.checklist[lang];
  const s = STRINGS[lang];
  const home = homeUrl(lang);
  const url = pageUrl(lang, content.checklist.slugEn);
  const crumbs = [{ name: s.home, url: home }, { name: c.h1 }];

  const phasesHtml = c.phases.map(phase => `
        <div class="mt-10">
          <h2 class="font-display text-xl tracking-[0.08em] uppercase">${phase.heading}</h2>
          <ul class="mt-5 space-y-3 text-ink/80 leading-relaxed">
            ${phase.items.map(item => `<li class="flex items-start gap-3"><svg class="w-4 h-4 text-wine shrink-0 mt-1"><use href="#icon-leaf"/></svg><span>${item}</span></li>`).join('\n')}
          </ul>
        </div>`).join('\n');

  const occasionsHtml = content.experiences.map(exp => {
    const et = exp[lang];
    return `<a href="${pageUrl(lang, exp.slugEn)}" class="block bg-cream-alt p-6 hover:bg-cream transition-colors">
          <svg class="w-6 h-6 text-wine mb-3"><use href="#${exp.icon}"/></svg>
          <h3 class="font-display text-base tracking-[0.1em] uppercase">${et.eyebrow}</h3>
        </a>`;
  }).join('\n');

  const body = `
    <section class="pt-32 pb-4 sm:pt-40">
      <div class="max-w-3xl mx-auto px-6 lg:px-10">
        ${breadcrumbNav(lang, crumbs)}
        <span class="mt-6 block font-display text-xs tracking-[0.3em] uppercase text-wine">${c.eyebrow}</span>
        <h1 class="mt-4 font-display font-light uppercase tracking-[0.04em] text-3xl sm:text-4xl lg:text-5xl leading-tight">${c.h1}</h1>
        <p class="mt-6 text-base sm:text-lg text-ink/80 leading-relaxed max-w-2xl">${c.subhead}</p>
      </div>
    </section>

    <section class="pb-24 sm:pb-32">
      <div class="max-w-3xl mx-auto px-6 lg:px-10">
        <p class="text-ink/80 leading-relaxed text-lg">${c.intro}</p>
        ${phasesHtml}

        <h2 class="mt-14 font-display text-xl tracking-[0.08em] uppercase">${s.occasions}</h2>
        <p class="mt-4 text-ink/80 leading-relaxed">${c.occasionsIntro}</p>
        <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${occasionsHtml}
        </div>

        <div class="mt-16 bg-wine text-cream p-8 sm:p-10 text-center">
          <h2 class="font-display font-light uppercase tracking-[0.04em] text-2xl">${c.ctaHeading}</h2>
          <p class="mt-3 text-cream/80 leading-relaxed max-w-md mx-auto">${c.ctaText}</p>
          <a href="${home}#inquire" class="mt-6 inline-flex items-center h-12 px-8 bg-cream text-wine font-display text-xs tracking-[0.2em] uppercase hover:bg-cream-alt transition-colors duration-200">${s.cta}</a>
        </div>
      </div>
    </section>`;

  const jsonLd = [
    breadcrumbSchema(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: c.h1,
      description: c.metaDescription,
      url,
      about: { '@type': 'BanquetHall', name: 'Aroma Events Valle de Guadalupe', url: SITE }
    }
  ];

  return renderShell({
    lang, url,
    title: c.metaTitle,
    description: c.metaDescription,
    ogDescription: c.ogDescription,
    ogImage: '/assets/photos/open-spaces.webp',
    alternateEn: pageUrl('en', content.checklist.slugEn),
    alternateEs: pageUrl('es', content.checklist.slugEn),
    jsonLd,
    body
  });
}

function renderShell({ lang, url, title, description, ogDescription, ogImage, alternateEn, alternateEs, jsonLd, body }) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#F3F1E5">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en" href="${alternateEn}">
  <link rel="alternate" hreflang="es" href="${alternateEs}">
  <link rel="alternate" hreflang="x-default" href="${alternateEn}">

  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${ogDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}${ogImage}">
  <meta property="og:locale" content="${lang === 'es' ? 'es_MX' : 'en_US'}">
  <meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_MX'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${ogDescription}">
  <meta name="twitter:image" content="${SITE}${ogImage}">

  <link rel="stylesheet" href="/css/styles.css">

  ${jsonLd.map(obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`).join('\n  ')}
</head>
<body class="font-body bg-cream text-ink antialiased">

  <div class="grain" aria-hidden="true"></div>
  ${ICON_DEFS}
  ${header(lang)}

  <main>${body}
  </main>

  ${footer(lang)}

  <script src="/js/i18n.js" defer></script>
  <script src="/js/main.js" defer></script>
</body>
</html>
`;
}

// ---------- Write all pages ----------
let count = 0;
for (const exp of content.experiences) {
  for (const lang of ['en', 'es']) {
    const dir = outDir(lang, exp.slugEn);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderExperiencePage(exp, lang));
    count++;
  }
}
for (const lang of ['en', 'es']) {
  const dir = outDir(lang, content.checklist.slugEn);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderChecklistPage(lang));
  count++;
}

console.log(`Wrote ${count} pages.`);
