const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('.icon');

// Order the button cycles through
const modes = ['auto', 'light', 'dark'];

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode) {
  const effectiveTheme = mode === 'auto' ? getSystemTheme() : mode;
  root.setAttribute('data-theme', effectiveTheme);
  icon.textContent = effectiveTheme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme-mode', mode);
}

// Load saved preference, or default to 'auto'
let currentMode = localStorage.getItem('theme-mode') || 'auto';
applyTheme(currentMode);

// Cycle through modes on click
toggleBtn.addEventListener('click', () => {
  const currentIndex = modes.indexOf(currentMode);
  currentMode = modes[(currentIndex + 1) % modes.length];
  applyTheme(currentMode);
});

// Live-update if in 'auto' mode and the OS theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentMode === 'auto') applyTheme('auto');
});