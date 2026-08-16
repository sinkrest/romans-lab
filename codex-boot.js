/* Codex theme boot for Roman's Lab (2026-08-16).
   Load with a PLAIN <script src="codex-boot.js"></script> in <head> — NOT
   defer/async — so the attribute lands before first paint and there is no
   light→dark flash. Mirrors the main site: one key, `cx-theme`.

   Also exposes cxThemeToggle() for the discreet header control, and stamps a
   `cx-theme-change` event so canvas/WebGL surfaces can repaint (a canvas keeps
   whichever palette it was first drawn with — it has no CSS to re-resolve). */
(function () {
  try {
    var p = new URLSearchParams(location.search).get('codex')
    if (p === 'dark' || p === 'light') localStorage.setItem('cx-theme', p)
    if (localStorage.getItem('cx-theme') === 'dark') {
      document.documentElement.setAttribute('data-codex', 'dark')
    } else {
      document.documentElement.removeAttribute('data-codex')
    }
  } catch (e) {}

  window.cxThemeToggle = function () {
    var root = document.documentElement
    var dark = root.getAttribute('data-codex') === 'dark'
    if (dark) {
      root.removeAttribute('data-codex')
      try { localStorage.setItem('cx-theme', 'light') } catch (e) {}
    } else {
      root.setAttribute('data-codex', 'dark')
      try { localStorage.setItem('cx-theme', 'dark') } catch (e) {}
    }
    window.dispatchEvent(new CustomEvent('cx-theme-change', { detail: { dark: !dark } }))
  }

  /** Read a codex token at draw time — canvas cannot resolve var(). */
  window.cxToken = function (name, fallback) {
    try {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
    } catch (e) { return fallback }
  }
})()
