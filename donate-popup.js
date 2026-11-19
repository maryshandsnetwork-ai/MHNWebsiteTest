/* Donate popup: once per session, 45 seconds after load.
   Closes with Escape, the backdrop, or Maybe later.
   Focus moves into the dialog and returns when it closes. */
(function () {
  var KEY = 'mhnDonatePopupShown';
  var DELAY_MS = 45 * 1000;

  function focusable(popup) {
    return Array.prototype.slice.call(
      popup.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
  }

  function init() {
    if (sessionStorage.getItem(KEY) === '1') return;
    var popup = document.getElementById('donate-popup');
    if (!popup) return;
    var previous = null;

    function close() {
      if (popup.hidden) return;
      popup.hidden = true;
      if (previous && previous.focus) previous.focus();
    }

    function open() {
      previous = document.activeElement;
      popup.hidden = false;
      sessionStorage.setItem(KEY, '1');
      var closeBtn = popup.querySelector('.donate-popup-close');
      if (closeBtn) closeBtn.focus();
    }

    setTimeout(open, DELAY_MS);

    popup.addEventListener('click', function (e) {
      if (e.target.closest('[data-dismiss="popup"]')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (popup.hidden) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      var items = focusable(popup);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
