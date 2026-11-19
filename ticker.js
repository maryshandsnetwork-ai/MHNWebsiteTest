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
