// Mobile menu: toggle, close with Escape or after choosing a link
(function () {
  var btn = document.getElementById('menu-btn');
  if (!btn) return;
  var nav = btn.closest('.nav');
  function set(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? btn.dataset.close : btn.dataset.open;
  }
  btn.addEventListener('click', function () { set(!nav.classList.contains('open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { set(false); btn.focus(); }
  });
  nav.querySelectorAll('ul a').forEach(function (a) {
    a.addEventListener('click', function () { set(false); });
  });
})();
