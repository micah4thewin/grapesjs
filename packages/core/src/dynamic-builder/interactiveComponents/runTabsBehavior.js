const runTabsBehavior = () => {
  document.querySelectorAll('[data-db-tabs]').forEach((tabsElement) => {
    if (tabsElement.dataset.dbTabsReady) return;
    tabsElement.dataset.dbTabsReady = 'true';
    const createUniqueId = (idPrefix) => idPrefix + '-' + Math.random().toString(36).slice(2, 9);
    const belongsHere = (memberElement) =>
      memberElement.closest ? memberElement.closest('[data-db-tabs]') === tabsElement : true;
    const readTabList = () => tabsElement.querySelector('[role=tablist]');
    const readTabs = () => Array.prototype.filter.call(tabsElement.querySelectorAll('[role=tab]'), belongsHere);
    const readPanels = () => Array.prototype.filter.call(tabsElement.querySelectorAll('[role=tabpanel]'), belongsHere);
    const wirePairs = () => {
      const panelList = readPanels();
      readTabs().forEach((tabElement, tabIndex) => {
        const panelElement = panelList[tabIndex];
        if (!panelElement) return;
        if (!tabElement.id) tabElement.id = createUniqueId('db-tab');
        if (!panelElement.id) panelElement.id = createUniqueId('db-tab-panel');
        tabElement.setAttribute('aria-controls', panelElement.id);
        panelElement.setAttribute('aria-labelledby', tabElement.id);
      });
    };
    const selectTab = (targetTab) => {
      wirePairs();
      const panelList = readPanels();
      readTabs().forEach((tabElement, tabIndex) => {
        const isSelected = tabElement === targetTab;
        tabElement.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tabElement.setAttribute('tabindex', isSelected ? '0' : '-1');
        const panelElement = panelList[tabIndex];
        if (!panelElement) return;
        if (isSelected) panelElement.removeAttribute('hidden');
        else panelElement.setAttribute('hidden', '');
      });
    };
    const syncOrientation = () => {
      const isVertical = tabsElement.getAttribute('data-db-orientation') === 'vertical';
      const tabListElement = readTabList();
      if (tabListElement) tabListElement.setAttribute('aria-orientation', isVertical ? 'vertical' : 'horizontal');
      return isVertical;
    };
    const findOwnTab = (eventTarget) => {
      const tabElement = eventTarget && eventTarget.closest ? eventTarget.closest('[role=tab]') : null;
      return tabElement && belongsHere(tabElement) ? tabElement : null;
    };
    tabsElement.addEventListener('click', (clickEvent) => {
      const tabElement = findOwnTab(clickEvent.target);
      if (tabElement) selectTab(tabElement);
    });
    tabsElement.addEventListener('keydown', (keyEvent) => {
      const tabElement = findOwnTab(keyEvent.target);
      if (!tabElement) return;
      const isVertical = syncOrientation();
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const previousKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
      const tabList = readTabs();
      const currentIndex = tabList.indexOf(tabElement);
      let targetIndex = -1;
      if (keyEvent.key === nextKey) targetIndex = (currentIndex + 1) % tabList.length;
      if (keyEvent.key === previousKey) targetIndex = (currentIndex - 1 + tabList.length) % tabList.length;
      if (keyEvent.key === 'Home') targetIndex = 0;
      if (keyEvent.key === 'End') targetIndex = tabList.length - 1;
      if (targetIndex < 0 || !tabList[targetIndex]) return;
      keyEvent.preventDefault();
      tabList[targetIndex].focus();
      selectTab(tabList[targetIndex]);
    });
    syncOrientation();
    const initialTabs = readTabs();
    const selectedTab = initialTabs.filter((tabElement) => tabElement.getAttribute('aria-selected') === 'true')[0];
    if (selectedTab || initialTabs[0]) selectTab(selectedTab || initialTabs[0]);
  });
};

export default runTabsBehavior;
