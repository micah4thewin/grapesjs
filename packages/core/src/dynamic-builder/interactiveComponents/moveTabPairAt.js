import readTabPairRecords from './readTabPairRecords.js';

const moveTabPairAt = (tabsComponent, pairIndex, indexOffset) => {
  const pairRecords = readTabPairRecords(tabsComponent);
  const targetIndex = pairIndex + indexOffset;
  const sourceRecord = pairRecords[pairIndex];
  if (!sourceRecord || targetIndex < 0 || targetIndex >= pairRecords.length) return false;
  const buttonIndex = sourceRecord.buttonComponent.index();
  sourceRecord.tabListComponent.append(sourceRecord.buttonComponent, { at: buttonIndex + indexOffset });
  if (sourceRecord.panelComponent) {
    const panelIndex = sourceRecord.panelComponent.index();
    tabsComponent.append(sourceRecord.panelComponent, { at: panelIndex + indexOffset });
  }
  return true;
};

export default moveTabPairAt;
