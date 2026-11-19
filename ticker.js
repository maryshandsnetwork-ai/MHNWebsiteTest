/* One ticker for the whole site. Dates live here, not copied into each page.
   English vs Spanish is chosen from the page language or the menu. */
(function () {
  var es = document.documentElement.lang === 'es';
  var nav = document.querySelector('nav');
  if (!es && nav && /Para familias|Quiénes somos|Capacitación/.test(nav.textContent)) es = true;

  var learn = es ? 'entrenamiento.html' : 'doula-training.html';
  var learnLabel = es ? 'Más información' : 'Learn more';
  var label = es ? 'Anuncio de la cohorte Tau' : 'Tau Cohort announcement';
  var accepting = es
    ? 'Aceptando clientes con fecha de parto en diciembre de 2026 y después'
    : 'Now accepting clients due December 2026 and beyond';
  var cohort = es
    ? 'Cohorte Tau · 15–20 de feb, 2027 · día presencial en Baton Rouge · Solicitudes de beca abiertas hasta el 10 de ene'
    : 'Tau Cohort · Feb 15–20, 2027 · in-person day in Baton Rouge · Scholarship applications open through Jan 10';

  function setHtml() {
    return '<span class="item"><strong>' + accepting + '</strong></span>'
      + '<span class="item"><strong>' + cohort + '</strong></span>'
      + '<a class="more" href="' + learn + '">' + learnLabel + '</a>';
  }

  /* Painted here so a 30-day cached stylesheet cannot leave the
     duplicate copy as a second unstyled line. */
  if (!document.getElementById('mhn-ticker-style')) {
    var style = document.createElement('style');
    style.id = 'mhn-ticker-style';
    style.textContent = [
      '.mhn-ticker{background:#5E376C;color:#fff;overflow:hidden;white-space:nowrap;border-bottom:3px solid #B5824A;font-family:Arial,Helvetica,sans-serif;line-height:1.4}',
      '.mhn-ticker-track{display:flex;flex-wrap:nowrap;width:max-content;animation:mhnTicker 36s linear infinite}',
      '.mhn-ticker:hover .mhn-ticker-track{animation-play-state:paused}',
      '.mhn-ticker-set{display:inline-flex;align-items:center;gap:36px;padding:11px 28px;white-space:nowrap;vertical-align:top}',
      '.mhn-ticker .item{font-size:15px;font-weight:700;color:#fff}',
      '.mhn-ticker a.more{background:#F3EEF6;color:#5E376C;text-decoration:none;padding:5px 14px;border-radius:999px;font-weight:800;font-size:13px;letter-spacing:.04em}',
      '@keyframes mhnTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
      '@media (prefers-reduced-motion:reduce){',
      '.mhn-ticker-track{animation:none;width:auto;flex-wrap:wrap;white-space:normal}',
      '.mhn-ticker-set{white-space:normal;flex-wrap:wrap;justify-content:center;width:100%}',
      '.mhn-ticker-set[data-dup]{display:none !important}',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  var bar = document.createElement('div');
  bar.className = 'mhn-ticker';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', label);
  bar.innerHTML = '<div class="mhn-ticker-track">'
    + '<div class="mhn-ticker-set">' + setHtml() + '</div>'
    + '<div class="mhn-ticker-set" data-dup aria-hidden="true">' + setHtml() + '</div>'
    + '</div>';

  document.querySelectorAll('.mhn-banner').forEach(function (el) { el.remove(); });
  document.body.insertBefore(bar, document.body.firstChild);
})();
