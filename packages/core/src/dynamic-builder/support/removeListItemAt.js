import collectListItemRecords from './collectListItemRecords.js';

const removeListItemAt = (rootComponent, listSelector, itemIndex) => {
  const targetRecord = collectListItemRecords(rootComponent, listSelector)[itemIndex];
  if (targetRecord && targetRecord.itemComponent.remove) targetRecord.itemComponent.remove();
};

export default removeListItemAt;
