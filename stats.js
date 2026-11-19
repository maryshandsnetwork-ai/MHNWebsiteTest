/* Count the impact numbers up when the band scrolls into view.
   The finished figure stays in the HTML. Reduced motion leaves it alone. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var nodes = [];
  document.querySelectorAll('.mhn-stats strong, .about-stats-band > div > div > div:first-child, .hero-stats > div > div:first-child').forEach(function (el) {
    nodes.push(el);
  });

  var items = nodes.map(function (el) {
    var raw = el.textContent;
    var match = String(raw).trim().match(/^(\d+)(.*)$/);
    if (!match) return null;
    return { el: el, raw: raw, n: parseInt(match[1], 10), suffix: match[2] || '' };
  }).filter(Boolean);

  if (!items.length || !('IntersectionObserver' in window)) return;

  function run(item) {
    var start = performance.now();
    var dur = 900;
    function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      if (t < 1) {
        item.el.textContent = Math.round(item.n * eased) + item.suffix;
        requestAnimationFrame(frame);
      } else {
        item.el.textContent = item.raw;
      }
    }
    requestAnimationFrame(frame);
  }

  var seen = new WeakSet();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || seen.has(entry.target)) return;
      seen.add(entry.target);
      io.unobserve(entry.target);
      var item = items.filter(function (it) { return it.el === entry.target; })[0];
      if (item) run(item);
    });
  }, { threshold: 0.45 });

  items.forEach(function (item) { io.observe(item.el); });
})();
