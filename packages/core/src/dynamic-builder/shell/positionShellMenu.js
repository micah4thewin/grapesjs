const positionShellMenu = (menuElement, stripElement) => {
  menuElement.classList.remove('gjs-db-menu-align-end');
  const viewWindow = stripElement.ownerDocument.defaultView;
  if (!viewWindow || !menuElement.getBoundingClientRect) return;
  const menuBounds = menuElement.getBoundingClientRect();
  const hostBounds = (stripElement.parentElement || stripElement).getBoundingClientRect();
  const rightLimit = Math.min(hostBounds.right, viewWindow.innerWidth || hostBounds.right);
  if (menuBounds.width && menuBounds.right > rightLimit - 4) menuElement.classList.add('gjs-db-menu-align-end');
};

export default positionShellMenu;
