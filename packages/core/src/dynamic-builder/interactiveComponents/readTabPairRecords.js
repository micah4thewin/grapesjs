import readComponentTextContent from './readComponentTextContent.js';

const readTabPairRecords = (tabsComponent) => {
  if (!tabsComponent || typeof tabsComponent.components !== 'function') return [];
  const childComponents = tabsComponent.components();
  const tabListComponent = childComponents.find((child) => String(child.get('type') || '') === 'db-tab-list');
  if (!tabListComponent) return [];
  const panelComponents = childComponents.filter((child) => String(child.get('type') || '') === 'db-tab-panel');
  return tabListComponent
    .components()
    .filter((child) => String(child.get('type') || '') === 'db-tab-button')
    .map((buttonComponent, pairIndex) => ({
      tabListComponent,
      buttonComponent,
      panelComponent: panelComponents[pairIndex] || null,
      labelText: readComponentTextContent(buttonComponent),
      isSelected: String((buttonComponent.getAttributes() || {})['aria-selected'] || '') === 'true',
    }));
};

export default readTabPairRecords;
