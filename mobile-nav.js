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
})();
