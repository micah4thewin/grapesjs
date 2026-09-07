import activateTokenGroupTab from './activateTokenGroupTab.js';

const wireTokenGroupTabs = (formElement) => {
  const tabListElement = formElement.querySelector('[role="tablist"]');
  if (!tabListElement) return;
  tabListElement.addEventListener('click', (clickEvent) => {
    const tabElement =
      clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('[data-db-token-tab]') : null;
    if (tabElement) activateTokenGroupTab(formElement, tabElement.getAttribute('data-db-token-tab'));
  });
  tabListElement.addEventListener('keydown', (keyEvent) => {
    const tabElements = Array.from(tabListElement.querySelectorAll('[data-db-token-tab]'));
    const currentIndex = tabElements.indexOf(keyEvent.target);
    if (currentIndex < 0) return;
    const stepMap = { ArrowRight: 1, ArrowLeft: -1, Home: -currentIndex, End: tabElements.length - 1 - currentIndex };
    if (!Object.prototype.hasOwnProperty.call(stepMap, keyEvent.key)) return;
    keyEvent.preventDefault();
    const nextTab = tabElements[(currentIndex + stepMap[keyEvent.key] + tabElements.length) % tabElements.length];
    activateTokenGroupTab(formElement, nextTab.getAttribute('data-db-token-tab'));
    nextTab.focus();
  });
};

export default wireTokenGroupTabs;
