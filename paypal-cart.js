/* Quantity stepper -> PayPal NCP cart. Renders +/- around a number, capped 1-10.
   On Add to Cart, clicks the PayPal embed N times. Tries the inner native
   <button> first (more reliable than the custom-element wrapper). */
(function () {
  function getInnerPaypalButton(wrapper) {
    if (!wrapper) return null;
    // PayPal NCP renders a plain <button> inside the custom element after init
    var btn = wrapper.querySelector('button');
    if (btn) return btn;
    // Fallback: <a role="button"> or any clickable child
    var a = wrapper.querySelector('a[role="button"], [role="button"], form button');
    return a || null;
  }

  function clickPaypal(wrapper) {
    var inner = getInnerPaypalButton(wrapper);
    if (inner) {
      inner.click();
      return true;
    }
    // Last-resort fallback: dispatch click on wrapper (rarely works but try)
    try { wrapper.click(); return true; } catch (e) { return false; }
  }

  function waitForPaypalReady(wrapper, cb, attempts) {
    attempts = attempts || 0;
    if (attempts > 80) {                      // ~8s max wait
      cb(false);
      return;
    }
    if (getInnerPaypalButton(wrapper)) {
      cb(true);
      return;
    }
    setTimeout(function () { waitForPaypalReady(wrapper, cb, attempts + 1); }, 100);
  }

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
      customBtn.textContent = 'Adding...';

      waitForPaypalReady(ppBtn, function (ready) {
        if (!ready) {
          customBtn.textContent = "Cart loading - please retry";
          setTimeout(function () {
            customBtn.textContent = orig;
            customBtn.disabled = false;
          }, 2200);
          return;
        }
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
          clickPaypal(ppBtn);
          i++;
          setTimeout(tick, 110);
        }
        tick();
      });
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
