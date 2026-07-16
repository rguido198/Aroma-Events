// Aroma Events — site interactions
// Header state on scroll, mobile nav toggle, scroll-reveal, footer year, inquiry form UX.

(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var scrollThreshold = 24;

  function onScroll() {
    if (!header) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var menuClose = document.getElementById('menu-close');

  function openMenu() {
    mobileNav.setAttribute('data-open', 'true');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.setAttribute('data-open', 'false');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (menuToggle && mobileNav && menuClose) {
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Footer year
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Inquiry form — no backend wired up yet; show a friendly inline confirmation.
  var form = document.getElementById('inquiry-form');
  var formStatus = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var message = window.AromaI18n
        ? window.AromaI18n.t('form.status.success')
        : 'Thank you — your inquiry details are ready. Connect this form to your email service to start receiving submissions.';
      formStatus.textContent = message;
      formStatus.classList.remove('hidden');
      form.reset();
    });
  }
})();
