const activateTabbedSections = (rootElement, tabName, options = {}) => {
  const tabAttribute = options.tabAttribute || 'data-db-tab';
  const sectionAttribute = options.sectionAttribute || 'data-db-section';
  rootElement.querySelectorAll('[' + sectionAttribute + ']').forEach((sectionElement) => {
    sectionElement.hidden = sectionElement.getAttribute(sectionAttribute) !== tabName;
  });
  let activeTabButton = null;
  rootElement.querySelectorAll('[' + tabAttribute + ']').forEach((tabButton) => {
    const isActiveTab = tabButton.getAttribute(tabAttribute) === tabName;
    tabButton.classList.toggle('gjs-db-button-primary', isActiveTab);
    tabButton.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
    tabButton.setAttribute('tabindex', isActiveTab ? '0' : '-1');
    if (isActiveTab) activeTabButton = tabButton;
  });
  if (options.focusTab && activeTabButton && activeTabButton.focus) activeTabButton.focus();
  return activeTabButton;
};

export default activateTabbedSections;
