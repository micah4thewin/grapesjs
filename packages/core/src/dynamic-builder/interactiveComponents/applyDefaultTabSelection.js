import readTabPairRecords from './readTabPairRecords.js';

const resolveOwningTabs = (tabButtonComponent) => {
  let currentComponent = tabButtonComponent;
  while (currentComponent && String(currentComponent.get('type') || '') !== 'db-tabs') {
    currentComponent = typeof currentComponent.parent === 'function' ? currentComponent.parent() : null;
  }
  return currentComponent || null;
};

const applyDefaultTabSelection = (tabButtonComponent) => {
  const tabsComponent = resolveOwningTabs(tabButtonComponent);
  if (!tabsComponent) return 0;
  let appliedCount = 0;
  readTabPairRecords(tabsComponent).forEach((pairRecord) => {
    const isSelected = pairRecord.buttonComponent === tabButtonComponent;
    const buttonAttributes = pairRecord.buttonComponent.getAttributes() || {};
    const nextSelected = isSelected ? 'true' : 'false';
    if (buttonAttributes['aria-selected'] !== nextSelected || buttonAttributes.tabindex !== (isSelected ? '0' : '-1')) {
      pairRecord.buttonComponent.addAttributes({ 'aria-selected': nextSelected, tabindex: isSelected ? '0' : '-1' });
    }
    const panelComponent = pairRecord.panelComponent;
    if (panelComponent) {
      const panelHidden = (panelComponent.getAttributes() || {}).hidden !== undefined;
      if (isSelected && panelHidden) panelComponent.removeAttributes(['hidden']);
      if (!isSelected && !panelHidden) panelComponent.addAttributes({ hidden: 'hidden' });
    }
    appliedCount += 1;
  });
  return appliedCount;
};

export default applyDefaultTabSelection;
