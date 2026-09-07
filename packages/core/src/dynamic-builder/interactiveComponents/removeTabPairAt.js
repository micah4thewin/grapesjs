import applyDefaultTabSelection from './applyDefaultTabSelection.js';
import readTabPairRecords from './readTabPairRecords.js';

const removeTabPairAt = (tabsComponent, pairIndex) => {
  const pairRecords = readTabPairRecords(tabsComponent);
  const targetRecord = pairRecords[pairIndex];
  if (!targetRecord) return false;
  targetRecord.buttonComponent.remove();
  if (targetRecord.panelComponent) targetRecord.panelComponent.remove();
  const remainingRecords = readTabPairRecords(tabsComponent);
  if (targetRecord.isSelected && remainingRecords[0]) applyDefaultTabSelection(remainingRecords[0].buttonComponent);
  return true;
};

export default removeTabPairAt;
