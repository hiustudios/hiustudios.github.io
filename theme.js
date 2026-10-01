const root = document.documentElement;
const modes = ['auto', 'light', 'dark'];

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode) {
  const effectiveTheme = mode === 'auto' ? getSystemTheme() : mode;
  root.setAttribute('data-theme', effectiveTheme);

  const icon = document.querySelector('#theme-toggle .icon');
  if (icon) icon.textContent = effectiveTheme === 'dark' ? '🌙' : '☀️';

  try {
    localStorage.setItem('theme-mode', mode);
  } catch (e) {}
}

function getSavedMode() {
  try {
    return localStorage.getItem('theme-mode') || 'auto';
  } catch (e) {
    return 'auto';
  }
}

let currentMode = getSavedMode();
applyTheme(currentMode);

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentMode);

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
      applyTheme(currentMode);
    });
  }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentMode === 'auto') applyTheme('auto');
});