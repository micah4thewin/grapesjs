const activateSeoModalTab = (rootElement, tabName) => {
  rootElement.querySelectorAll('[data-db-seo-section]').forEach((sectionElement) => {
    sectionElement.hidden = sectionElement.dataset.dbSeoSection !== tabName;
  });
  rootElement.querySelectorAll('[data-db-seo-tab]').forEach((tabButton) => {
    const isActiveTab = tabButton.dataset.dbSeoTab === tabName;
    tabButton.classList.toggle('gjs-db-button-primary', isActiveTab);
    tabButton.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
  });
};

export default activateSeoModalTab;
