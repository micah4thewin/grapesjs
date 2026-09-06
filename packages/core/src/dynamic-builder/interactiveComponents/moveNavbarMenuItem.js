import collectNavbarMenuRecords from './collectNavbarMenuRecords.js';

const moveNavbarMenuItem = (navbarComponent, itemIndex, indexOffset) => {
  const menuRecords = collectNavbarMenuRecords(navbarComponent);
  const targetIndex = itemIndex + indexOffset;
  if (!menuRecords[itemIndex] || targetIndex < 0 || targetIndex >= menuRecords.length) return;
  const menuComponent = navbarComponent.find('[data-db-navbar-menu]')[0];
  if (!menuComponent) return;
  const movedComponent = menuRecords[itemIndex].itemComponent;
  menuComponent.append(movedComponent, { at: targetIndex });
};

export default moveNavbarMenuItem;
