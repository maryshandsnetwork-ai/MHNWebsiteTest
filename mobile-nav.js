/* Mobile hamburger nav toggle. Injected on every page. */
(function () {
  document.querySelectorAll('nav.nav').forEach(function (nav) {
    var links = nav.querySelector('.nav-links');
    if (!links) return;
    if (nav.querySelector('.nav-burger')) return;

    var btn = document.createElement('button');
    btn.className = 'nav-burger';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    // Insert button right before nav-links so flex order works
    links.parentNode.insertBefore(btn, links);

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close menu when any link inside it is tapped
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.querySelectorAll('.burger').forEach(function (btn) {
    if (btn.dataset.wired) return;
    btn.dataset.wired = '1';
    btn.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.body.classList.remove('nav-open');
  });

  if (!document.querySelector('.sticky-mobile-cta') && !document.querySelector('.mbar') && !document.querySelector('.portal-app')) {
    var es = (document.documentElement.lang || '').toLowerCase().indexOf('es') === 0
      || !!document.querySelector('a[href="donar.html"], a[href="./donar.html"]');
    var bar = document.createElement('div');
    bar.className = 'sticky-mobile-cta';
    bar.innerHTML = es
      ? '<a class="apply" href="para-familias.html">Solicitar</a><a class="call" href="tel:2254247532">Llamar</a><a class="donate" href="donar.html">Donar</a>'
      : '<a class="apply" href="for-mom.html">Apply</a><a class="call" href="tel:2254247532">Call</a><a class="donate" href="donate.html">Donate</a>';
    document.body.appendChild(bar);
  }

  document.querySelectorAll('.mhn-menu').forEach(function (btn) {
    if (btn.dataset.wired) return;
    btn.dataset.wired = '1';
    btn.addEventListener('click', function () {
      var open = document.body.classList.toggle('mhn-nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? btn.getAttribute('data-close') : btn.getAttribute('data-open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('mhn-nav-open')) {
        document.body.classList.remove('mhn-nav-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = btn.getAttribute('data-open');
      }
    });
  });
})();
