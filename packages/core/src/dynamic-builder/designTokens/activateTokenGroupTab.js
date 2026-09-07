const activateTokenGroupTab = (formElement, groupKey) => {
  formElement.querySelectorAll('[data-db-token-tab]').forEach((tabElement) => {
    const isActive = tabElement.getAttribute('data-db-token-tab') === groupKey;
    tabElement.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tabElement.setAttribute('tabindex', isActive ? '0' : '-1');
  });
  formElement.querySelectorAll('[data-db-token-panel]').forEach((panelElement) => {
    panelElement.hidden = panelElement.getAttribute('data-db-token-panel') !== groupKey;
  });
};

export default activateTokenGroupTab;
