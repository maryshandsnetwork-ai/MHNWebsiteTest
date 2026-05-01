/* Donate popup: fires once per session after 45 seconds, dismissable. */
(function () {
  var KEY = 'mhnDonatePopupShown';
  var DELAY_MS = 45 * 1000;

  function init() {
    if (sessionStorage.getItem(KEY) === '1') return;
    var popup = document.getElementById('donate-popup');
    if (!popup) return;

    setTimeout(function () {
      popup.hidden = false;
      sessionStorage.setItem(KEY, '1');
    }, DELAY_MS);

    popup.addEventListener('click', function (e) {
      if (e.target.matches('[data-dismiss="popup"]')) {
        popup.hidden = true;
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !popup.hidden) popup.hidden = true;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
