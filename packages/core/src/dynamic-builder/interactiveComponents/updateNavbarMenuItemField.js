import collectNavbarMenuRecords from './collectNavbarMenuRecords.js';

const updateNavbarMenuItemField = (navbarComponent, itemIndex, fieldName, fieldValue) => {
  const targetRecord = collectNavbarMenuRecords(navbarComponent)[itemIndex];
  if (!targetRecord) return;
  if (fieldName === 'label') targetRecord.linkComponent.components(fieldValue);
  if (fieldName === 'href') targetRecord.linkComponent.addAttributes({ href: fieldValue });
};

export default updateNavbarMenuItemField;
