import { window, document, extend } from 'ssr-window';
import platform from 'platform';

// if clientside
if (platform.name !== 'Node.js' && platform.name) {
  document.documentElement.classList.add(platform.name.toLowerCase());
}

// add window.navigator.language
extend(window, {
  localStorage: {
    getItem: () => {},
    setItem: () => {},
    removeItem: () => {},
  },
  navigator: {
    language: 'en',
  },
});

// Force refresh favicon when system color scheme changes
export default null;

function listener(e: MediaQueryListEvent) {
  const link: HTMLLinkElement | null = document.querySelector(
    "link[rel*='icon']",
  );
  if (link) {
    const darkModeOn = e.matches;
    link.href = 'icon.svg' + (darkModeOn ? '?mode=dark' : '');
  }
}
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
try {
  darkModeMediaQuery.addListener(listener);
  darkModeMediaQuery.addEventListener('change', listener);
} catch (e) {}
