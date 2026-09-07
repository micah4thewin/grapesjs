import renderTemplateCards from './renderTemplateCards.js';

const activateTemplateManagerTab = (editor, rootElement, viewState, tabId, options = {}) => {
  viewState.tabId = tabId;
  viewState.categoryId = 'all';
  const gridElement = rootElement.querySelector('[data-db-template-grid]');
  rootElement.querySelectorAll('[data-db-template-tab]').forEach((tabButton) => {
    const isActive = tabButton.getAttribute('data-db-template-tab') === tabId;
    tabButton.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tabButton.setAttribute('tabindex', isActive ? '0' : '-1');
    if (isActive && gridElement) gridElement.setAttribute('aria-labelledby', tabButton.id);
    if (isActive && options.focusTab && typeof tabButton.focus === 'function') tabButton.focus();
  });
  return renderTemplateCards(editor, rootElement, viewState);
};

export default activateTemplateManagerTab;
