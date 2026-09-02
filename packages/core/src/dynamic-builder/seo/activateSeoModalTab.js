const activateSeoModalTab = (rootElement, tabName, options = {}) => {
  rootElement.querySelectorAll('[data-db-seo-section]').forEach((sectionElement) => {
    sectionElement.hidden = sectionElement.dataset.dbSeoSection !== tabName;
  });
  let activeTabButton = null;
  rootElement.querySelectorAll('[data-db-seo-tab]').forEach((tabButton) => {
    const isActiveTab = tabButton.dataset.dbSeoTab === tabName;
    tabButton.classList.toggle('gjs-db-button-primary', isActiveTab);
    tabButton.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
    tabButton.setAttribute('tabindex', isActiveTab ? '0' : '-1');
    if (isActiveTab) activeTabButton = tabButton;
  });
  if (options.focusTab && activeTabButton && activeTabButton.focus) activeTabButton.focus();
};

export default activateSeoModalTab;
