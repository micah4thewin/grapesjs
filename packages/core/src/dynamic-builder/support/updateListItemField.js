import collectListItemRecords from './collectListItemRecords.js';

const updateListItemField = (rootComponent, listSelector, itemIndex, fieldName, fieldValue) => {
  const targetRecord = collectListItemRecords(rootComponent, listSelector)[itemIndex];
  if (!targetRecord) return;
  if (fieldName === 'label') targetRecord.linkComponent.components(fieldValue);
  if (fieldName === 'href') targetRecord.linkComponent.addAttributes({ href: fieldValue });
};

export default updateListItemField;
