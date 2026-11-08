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

// Theme toggle: follows the device until the visitor picks light or dark; the choice is remembered
(function () {
  var btn = document.getElementById('theme-btn');
  if (!btn) return;
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : media.matches;
  }
  function sync() { btn.setAttribute('aria-pressed', isDark() ? 'true' : 'false'); }
  btn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  if (media.addEventListener) media.addEventListener('change', sync);
  sync();
})();

// Contacts map: Google is contacted only after the visitor clicks "Show the map"
(function () {
  document.querySelectorAll('.map-frame').forEach(function (box) {
    var btn = box.querySelector('.map-load');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = box.dataset.src;
      f.title = box.dataset.title;
      f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      box.replaceWith(f);
      f.focus();
    });
  });
})();
