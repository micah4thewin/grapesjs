const activateCustomAssetsTab = (rootElement, tabId, options = {}) => {
  rootElement.querySelectorAll('[data-db-custom-tab]').forEach((tabButton) => {
    const isActive = tabButton.getAttribute('data-db-custom-tab') === tabId;
    tabButton.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tabButton.setAttribute('tabindex', isActive ? '0' : '-1');
    if (isActive && options.focusTab && typeof tabButton.focus === 'function') tabButton.focus();
  });
  rootElement.querySelectorAll('[data-db-custom-panel]').forEach((panelElement) => {
    panelElement.hidden = panelElement.getAttribute('data-db-custom-panel') !== tabId;
  });
  return tabId;
};

export default activateCustomAssetsTab;
