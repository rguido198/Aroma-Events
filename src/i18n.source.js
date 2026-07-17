// Aroma Events — language switcher
// Both / (English) and /es/ (Spanish) are pre-rendered, static pages — each one
// server-renders its own language so crawlers and visitors always get real content
// on first load. This script only handles the EN/ES button styling and redirects
// between the two sibling pages, preserving the current path, query string, and hash.

(function () {
  'use strict';

  function currentLang() {
    return window.location.pathname.indexOf('/es') === 0 ? 'es' : 'en';
  }

  function targetPath(lang) {
    var path = window.location.pathname;
    if (lang === 'es') {
      return path.indexOf('/es') === 0 ? path : '/es' + (path === '/' ? '/' : path);
    }
    return path.replace(/^\/es\/?/, '/') || '/';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = currentLang();

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('text-wine', isActive);
      btn.classList.toggle('text-ink/40', !isActive);

      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-lang-btn');
        if (target === lang) return;
        window.location.href = targetPath(target) + window.location.search + window.location.hash;
      });
    });
  });
})();
