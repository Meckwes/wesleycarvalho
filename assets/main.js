/* =============================================================
   Wesley Carvalho — Portfolio
   Interações: header, menu, reveal, scrollspy, abas, form
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     HEADER — estado de scroll
     --------------------------------------------------------- */
  var header = document.getElementById('site-header');
  var navShell = document.getElementById('nav-shell');
  var lastScrolled = null;

  function onScroll() {
    var scrolled = window.scrollY > 24;
    if (scrolled === lastScrolled) return;
    lastScrolled = scrolled;

    if (scrolled) {
      header.classList.remove('pb-0');
      navShell.classList.add('border-white/10', 'bg-ink-900/85', 'shadow-lift', 'backdrop-blur-xl');
      navShell.classList.remove('border-transparent');
    } else {
      navShell.classList.remove('border-white/10', 'bg-ink-900/85', 'shadow-lift', 'backdrop-blur-xl');
      navShell.classList.add('border-transparent');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     MENU MOBILE
     --------------------------------------------------------- */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMenu() {
    mobileNav.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }

  menuToggle.addEventListener('click', function () {
    var open = mobileNav.classList.toggle('hidden') === false;
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) closeMenu();
  });

  /* ---------------------------------------------------------
     SCROLL SUAVE com compensação do header fixo
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-visible'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el, i) {
      if (!el.getAttribute('data-delay')) {
        var stagger = (i % 3) * 80;
        el.setAttribute('data-delay', String(stagger));
      }
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     CONTADORES (métricas do hero)
     --------------------------------------------------------- */
  var counters = document.querySelectorAll('.counter');
  if (counters.length) {
    var reduceCount = reduceMotion;
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target') || '0', 10);
        countIO.unobserve(el);
        if (reduceCount) { el.textContent = String(target); return; }
        var start = performance.now();
        var dur = 1100;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { countIO.observe(c); });
  }

  /* ---------------------------------------------------------
     SCROLLSPY — destaca a seção atual no nav
     --------------------------------------------------------- */
  var sections = ['sobre', 'expertise', 'cases', 'experiencia', 'contato']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('nav[aria-label="Navegação principal"] a'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('text-white', active);
          link.classList.toggle('text-slate-400', !active);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------
     ABAS DE SKILL
     --------------------------------------------------------- */
  var skillTabs = document.querySelectorAll('.skill-tab');
  var skillPanels = document.querySelectorAll('.skill-panel');

  skillTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-tab');

      skillTabs.forEach(function (t) {
        var active = t === tab;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.classList.toggle('border-brand', active);
        t.classList.toggle('text-brand', active);
        t.classList.toggle('border-transparent', !active);
        t.classList.toggle('text-slate-500', !active);
      });

      skillPanels.forEach(function (p) {
        var show = p.getAttribute('data-panel') === key;
        p.classList.toggle('hidden', !show);
        if (show && !reduceMotion) {
          p.classList.remove('animate-fade-up');
          void p.offsetWidth;
          p.classList.add('animate-fade-up');
        }
      });
    });
  });

  /* ---------------------------------------------------------
     FORMULÁRIO DE CONTATO — validação + envio simulado
     --------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var submitBtn = document.getElementById('contact-submit');
    var label = document.getElementById('contact-label');
    var spinner = document.getElementById('contact-spinner');
    var success = document.getElementById('contact-success');

    function fieldWrap(input) {
      return input.closest('[data-field]');
    }
    function setError(input, hasError) {
      var wrap = fieldWrap(input);
      if (!wrap) return;
      var err = wrap.querySelector('[data-error]');
      input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
      if (err) err.classList.toggle('is-visible', hasError);
      wrap.classList.toggle('border-red-500/40', hasError);
    }

    var validators = {
      name: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      type: function (v) { return v.trim() !== ''; },
      message: function (v) { return v.trim().length >= 10; }
    };

    var inputs = {
      name: document.getElementById('c-name'),
      email: document.getElementById('c-email'),
      type: document.getElementById('c-type'),
      message: document.getElementById('c-message')
    };

    Object.keys(inputs).forEach(function (key) {
      var el = inputs[key];
      if (!el) return;
      el.addEventListener('blur', function () { setError(el, !validators[key](el.value)); });
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid') === 'true') setError(el, !validators[key](el.value));
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Object.keys(inputs).forEach(function (key) {
        var el = inputs[key];
        if (!el) return;
        var bad = !validators[key](el.value);
        setError(el, bad);
        if (bad && !firstInvalid) firstInvalid = el;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      label.textContent = 'Enviando…';
      spinner.classList.remove('hidden');

      window.setTimeout(function () {
        submitBtn.disabled = false;
        label.textContent = 'Mensagem enviada';
        spinner.classList.add('hidden');
        success.classList.remove('hidden');
        success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
        form.reset();
        Object.keys(inputs).forEach(function (key) {
          if (inputs[key]) inputs[key].setAttribute('aria-invalid', 'false');
        });
        window.setTimeout(function () {
          success.classList.add('hidden');
          label.textContent = 'Enviar mensagem';
        }, 7000);
      }, 1100);
    });
  }

  /* ---------------------------------------------------------
     LOG DE ASSINATURA
     --------------------------------------------------------- */
  console.log('%c> Wesley.', 'font: 700 32px sans-serif; color:#84CC16;');
  console.log('%cEngenheiro de Software Full Stack & Arquiteto de Soluções.', 'font: 400 14px sans-serif; color:#94A3B8;');
  console.log('%chttps://wesleycarvalho.vercel.app', 'font: 400 12px monospace; color:#64748B;');
})();
