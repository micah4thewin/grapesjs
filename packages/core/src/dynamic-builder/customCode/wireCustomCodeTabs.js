const wireCustomCodeTabs = (formElement, onTabShown) => {
  const tabButtons = [...formElement.querySelectorAll('[data-db-code-tab]')];
  const panelElements = [...formElement.querySelectorAll('[data-db-code-panel]')];
  const showTab = (slotName) => {
    tabButtons.forEach((tabButton) => {
      const isActive = tabButton.getAttribute('data-db-code-tab') === slotName;
      tabButton.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tabButton.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    panelElements.forEach((panelElement) => {
      panelElement.hidden = panelElement.getAttribute('data-db-code-panel') !== slotName;
    });
    onTabShown(slotName);
  };
  tabButtons.forEach((tabButton) =>
    tabButton.addEventListener('click', () => showTab(tabButton.getAttribute('data-db-code-tab'))),
  );
  formElement.querySelector('[role="tablist"]').addEventListener('keydown', (keyEvent) => {
    const stepValue = keyEvent.key === 'ArrowRight' ? 1 : keyEvent.key === 'ArrowLeft' ? -1 : 0;
    if (!stepValue) return;
    keyEvent.preventDefault();
    const activeIndex = tabButtons.findIndex((tabButton) => tabButton.getAttribute('aria-selected') === 'true');
    const nextIndex = (activeIndex + stepValue + tabButtons.length) % tabButtons.length;
    showTab(tabButtons[nextIndex].getAttribute('data-db-code-tab'));
    tabButtons[nextIndex].focus();
  });
};

export default wireCustomCodeTabs;
