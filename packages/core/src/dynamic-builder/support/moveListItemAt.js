import collectListItemRecords from './collectListItemRecords.js';
import resolveListContainerComponent from './resolveListContainerComponent.js';

const moveListItemAt = (rootComponent, listSelector, itemIndex, indexOffset) => {
  const itemRecords = collectListItemRecords(rootComponent, listSelector);
  const targetIndex = itemIndex + indexOffset;
  if (!itemRecords[itemIndex] || targetIndex < 0 || targetIndex >= itemRecords.length) return;
  const listComponent = resolveListContainerComponent(rootComponent, listSelector);
  if (listComponent) listComponent.append(itemRecords[itemIndex].itemComponent, { at: targetIndex });
};

export default moveListItemAt;
