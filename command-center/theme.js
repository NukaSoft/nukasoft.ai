/* ======================================================================
   Skippy Control Plane — Shared Theme System
   Owner: dashboard skill
   Included on every dashboard page. Do not duplicate toggleTheme logic
   in individual pages — include this file instead.
   ====================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'nukasoft-theme';
  const THEMES = ['pipboy', 'overseer'];

  function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(saved) ? saved : 'pipboy';
  }

  function applyTheme(theme) {
    if (theme === 'overseer') {
      document.body.classList.add('theme-overseer');
    } else {
      document.body.classList.remove('theme-overseer');
    }
    // Update any element marked as the theme label
    const labels = document.querySelectorAll('#theme-label, [data-theme-label]');
    labels.forEach(el => {
      el.textContent = theme === 'overseer' ? 'OVERSEER' : 'PIP-BOY';
    });
    // Emit a custom event so pages can react if they need to
    document.dispatchEvent(new CustomEvent('nukasoft-theme-change', { detail: { theme } }));
  }

  // Global API — called by inline onclick="toggleTheme()" and by the shared widget
  window.toggleTheme = function () {
    const current = getTheme();
    const next = current === 'overseer' ? 'pipboy' : 'overseer';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  // Apply the saved theme as early as possible
  function init() {
    applyTheme(getTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cross-tab sync: if another tab changes the theme, update this tab
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && THEMES.includes(e.newValue)) {
      applyTheme(e.newValue);
    }
  });

  // Inject the theme toggle widget into any element with data-theme-widget
  // Pages that want the standard widget just drop:
  //   <div data-theme-widget></div>
  // anywhere in their markup. Pages that render their own toggle (like index.html's
  // custom one) can ignore this and just call toggleTheme() from their onclick.
  function injectWidget() {
    const slots = document.querySelectorAll('[data-theme-widget]');
    slots.forEach(slot => {
      if (slot.dataset.widgetInit === 'true') return;
      slot.dataset.widgetInit = 'true';
      slot.innerHTML = `
        <button class="theme-toggle" onclick="toggleTheme()" title="Toggle color theme" aria-label="Toggle theme">
          <span class="theme-toggle-track"></span>
          <span id="theme-label" data-theme-label>PIP-BOY</span>
        </button>
      `;
    });
    // Re-apply to pick up newly injected labels
    applyTheme(getTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
  } else {
    injectWidget();
  }
})();
