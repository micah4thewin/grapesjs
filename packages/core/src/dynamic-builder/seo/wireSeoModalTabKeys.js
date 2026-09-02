import activateSeoModalTab from './activateSeoModalTab.js';

const wireSeoModalTabKeys = (rootElement) => {
  const tabListElement = rootElement.querySelector('[role="tablist"]');
  if (!tabListElement) return;
  tabListElement.addEventListener('keydown', (keyEvent) => {
    const navigationKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (navigationKeys.indexOf(keyEvent.key) < 0) return;
    const tabButtons = [...tabListElement.querySelectorAll('[data-db-seo-tab]')];
    if (!tabButtons.length) return;
    const activeIndex = tabButtons.findIndex((tabButton) => tabButton.getAttribute('aria-selected') === 'true');
    const currentIndex = activeIndex < 0 ? 0 : activeIndex;
    let nextIndex = currentIndex;
    if (keyEvent.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    if (keyEvent.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabButtons.length;
    if (keyEvent.key === 'Home') nextIndex = 0;
    if (keyEvent.key === 'End') nextIndex = tabButtons.length - 1;
    keyEvent.preventDefault();
    activateSeoModalTab(rootElement, tabButtons[nextIndex].dataset.dbSeoTab, { focusTab: true });
  });
};

export default wireSeoModalTabKeys;
