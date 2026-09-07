import buildTabPairDefinition from './buildTabPairDefinition.js';
import readTabPairRecords from './readTabPairRecords.js';

const appendTabPair = (tabsComponent, interactiveTextDefaults) => {
  const pairRecords = readTabPairRecords(tabsComponent);
  const tabListComponent =
    (pairRecords[0] && pairRecords[0].tabListComponent) ||
    tabsComponent.components().find((child) => String(child.get('type') || '') === 'db-tab-list');
  if (!tabListComponent) return null;
  const pairDefinition = buildTabPairDefinition(
    interactiveTextDefaults.tabLabel,
    interactiveTextDefaults.tabPanelText,
    pairRecords.length === 0,
  );
  const addedButtons = tabListComponent.append(pairDefinition.buttonDefinition);
  const addedPanels = tabsComponent.append(pairDefinition.panelDefinition);
  return { buttonComponent: addedButtons[0] || null, panelComponent: addedPanels[0] || null };
};

export default appendTabPair;
