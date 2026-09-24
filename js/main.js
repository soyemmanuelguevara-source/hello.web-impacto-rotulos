(function () {
  'use strict';

  /* ───────── Loader ───────── */
  var loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loader) loader.classList.add('is-hidden');
    }, 350);
  });

  /* ───────── Footer year ───────── */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ───────── Navbar scroll state ───────── */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ───────── Mobile menu ───────── */
  var hamburger = document.getElementById('hamburger');
  var mobMenu = document.getElementById('mob-menu');
  function closeMenu() {
    if (!hamburger || !mobMenu) return;
    hamburger.classList.remove('is-active');
    mobMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if (hamburger && mobMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    mobMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ───────── Reveal on scroll ───────── */
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ───────── Marquee content ───────── */
  var marquee = document.getElementById('marquee');
  if (marquee) {
    var terms = [
      'Rótulos', 'Toldos', 'Publicidad Exterior', 'Bardas y Azoteas',
      'Lonas y Vinil', 'Murales', 'Rotulación de Fachadas', 'Señalética'
    ];
    var groupHTML = terms.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    marquee.innerHTML = groupHTML + groupHTML;
  }

  /* ───────── Hero canvas particles ───────── */
  var canvas = document.getElementById('hero-canvas');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && canvas.getContext && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var w, h, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticles() {
      var count = Math.max(18, Math.min(40, Math.floor(w / 40)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 2.2,
          vy: 0.15 + Math.random() * 0.35,
          vx: (Math.random() - 0.5) * 0.2,
          a: 0.15 + Math.random() * 0.4
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232,29,37,' + p.a + ')';
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }

    resize();
    makeParticles();
    requestAnimationFrame(tick);
    window.addEventListener('resize', function () {
      resize();
      makeParticles();
    });
  }

  /* ───────── Contact form → WhatsApp ───────── */
  var WHATSAPP_NUMBER = '52XXXXXXXXXX'; // TODO: reemplazar con el número real de WhatsApp de Impacto (sin espacios, con lada 52 + 10 dígitos)
  var form = document.getElementById('wa-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var interest = document.getElementById('f-interest').value;
      var msg = document.getElementById('f-msg').value.trim();

      if (!name || !msg) {
        form.reportValidity();
        return;
      }

      var text = 'Hola, soy ' + name + '. Me interesa: ' + interest + '. ' + msg;
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();
