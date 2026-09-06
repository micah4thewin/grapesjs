import collectNavbarMenuRecords from './collectNavbarMenuRecords.js';

const removeNavbarMenuItem = (navbarComponent, itemIndex) => {
  const menuRecords = collectNavbarMenuRecords(navbarComponent);
  const targetRecord = menuRecords[itemIndex];
  if (targetRecord && targetRecord.itemComponent.remove) targetRecord.itemComponent.remove();
};

export default removeNavbarMenuItem;
