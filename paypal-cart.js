/* Quantity stepper -> PayPal NCP cart. Renders +/- around a number, capped 1-10.
   On Add to Cart, clicks the hidden PayPal embed N times. */
(function () {
  function setupGroup(group) {
    var minus = group.querySelector('.qty-minus');
    var plus  = group.querySelector('.qty-plus');
    var value = group.querySelector('.qty-value');
    var customBtn = group.querySelector('.add-to-cart-custom');
    if (!minus || !plus || !value || !customBtn) return;

    var ppId = customBtn.dataset.ppId;
    var ppBtn = group.querySelector('paypal-add-to-cart-button[data-id="' + ppId + '"]');

    var qty = 1;
    function update(n) {
      qty = Math.max(1, Math.min(10, n));
      value.textContent = qty;
      minus.disabled = (qty <= 1);
      plus.disabled  = (qty >= 10);
    }
    update(1);
    minus.addEventListener('click', function () { update(qty - 1); });
    plus.addEventListener('click',  function () { update(qty + 1); });

    customBtn.addEventListener('click', function () {
      if (!ppBtn) return;
      var orig = customBtn.textContent;
      customBtn.disabled = true;
      customBtn.textContent = 'Adding…';
      var n = qty;
      var i = 0;
      function tick() {
        if (i >= n) {
          customBtn.textContent = 'Added ' + n + ' to cart ✓';
          setTimeout(function () {
            customBtn.textContent = orig;
            customBtn.disabled = false;
          }, 1600);
          return;
        }
        // Click the PayPal element. Most NCP web components forward .click() to their internal handler.
        try { ppBtn.click(); } catch (e) {}
        i++;
        setTimeout(tick, 90);
      }
      tick();
    });
  }

  function init() {
    document.querySelectorAll('.qty-cart-group').forEach(setupGroup);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
