/* Quantity stepper -> PayPal NCP cart.
   PayPal renders an internal form with a submit button. We:
     1) wait for the hidden PayPal widget to mount its inner submit button
     2) on Add-to-cart click, dispatch real MouseEvent on the submit button N times
        (PayPal's web component checks event source, so .click() can fail
        but a fully-formed MouseEvent gets through.)
*/
(function () {
  function findPaypalSubmit(wrapper) {
    if (!wrapper) return null;
    // PayPal NCP renders all buttons as type="button"; the actual "Add to cart"
    // button has its 3 state strings stacked: "Add to CartAdding to CartAdded to Cart"
    var buttons = wrapper.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      var txt = (b.textContent || '').toLowerCase();
      if (txt.indexOf('add to cart') !== -1) return b;
    }
    // Last button is usually the action button
    if (buttons.length) return buttons[buttons.length - 1];
    return null;
  }

  function realClick(el) {
    if (!el) return false;
    try {
      // Fire pointerdown/up/click in order; many components require this sequence
      var opts = { bubbles: true, cancelable: true, view: window, button: 0, buttons: 1 };
      el.dispatchEvent(new MouseEvent('mousedown', opts));
      el.dispatchEvent(new MouseEvent('mouseup', opts));
      el.dispatchEvent(new MouseEvent('click', opts));
    } catch (e) { try { el.click(); } catch (_) {} }
    return true;
  }

  function waitForReady(wrapper, cb, attempts) {
    attempts = attempts || 0;
    if (attempts > 100) { cb(false); return; }
    if (findPaypalSubmit(wrapper)) { cb(true); return; }
    setTimeout(function () { waitForReady(wrapper, cb, attempts + 1); }, 100);
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

      waitForReady(ppBtn, function (ready) {
        var submit = findPaypalSubmit(ppBtn);
        if (!ready || !submit) {
          customBtn.textContent = "Cart loading - please retry";
          setTimeout(function () { customBtn.textContent = orig; customBtn.disabled = false; }, 2200);
          return;
        }
        var n = qty;
        var i = 0;
        function tick() {
          if (i >= n) {
            customBtn.textContent = 'Added ' + n + ' to cart ✓';
            setTimeout(function () { customBtn.textContent = orig; customBtn.disabled = false; }, 1600);
            return;
          }
          realClick(submit);
          i++;
          setTimeout(tick, 250);
        }
        tick();
      });
    });
  }

  function init() {
    document.querySelectorAll('.qty-cart-group').forEach(setupGroup);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
