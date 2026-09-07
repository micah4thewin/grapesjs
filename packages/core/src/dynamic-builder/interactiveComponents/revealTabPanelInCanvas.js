const revealWithinTabs = (tabsElement, targetElement) => {
  const belongsHere = (memberElement) => memberElement.closest('[data-db-tabs]') === tabsElement;
  const tabElements = Array.prototype.filter.call(tabsElement.querySelectorAll('[role="tab"]'), belongsHere);
  const panelElements = Array.prototype.filter.call(tabsElement.querySelectorAll('[role="tabpanel"]'), belongsHere);
  const panelElement = targetElement.closest('[role="tabpanel"]');
  const tabElement = targetElement.closest('[role="tab"]');
  let targetIndex = -1;
  if (panelElement && belongsHere(panelElement)) targetIndex = panelElements.indexOf(panelElement);
  else if (tabElement && belongsHere(tabElement)) targetIndex = tabElements.indexOf(tabElement);
  if (targetIndex < 0) return false;
  tabElements.forEach((currentTab, tabIndex) =>
    currentTab.setAttribute('aria-selected', tabIndex === targetIndex ? 'true' : 'false'),
  );
  panelElements.forEach((currentPanel, panelIndex) => {
    if (panelIndex === targetIndex) currentPanel.removeAttribute('hidden');
    else currentPanel.setAttribute('hidden', '');
  });
  return true;
};

const revealTabPanelInCanvas = (targetElement) => {
  let revealedCount = 0;
  let cursorElement = targetElement && targetElement.closest ? targetElement : null;
  while (cursorElement) {
    const tabsElement = cursorElement.closest('[data-db-tabs]');
    if (!tabsElement) break;
    if (revealWithinTabs(tabsElement, cursorElement)) revealedCount += 1;
    cursorElement = tabsElement.parentElement;
  }
  return revealedCount;
};

export default revealTabPanelInCanvas;
