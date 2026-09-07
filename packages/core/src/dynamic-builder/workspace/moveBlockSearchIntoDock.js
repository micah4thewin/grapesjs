const moveBlockSearchIntoDock = (editor, workspaceElement, shouldShow) => {
  const searchSlotElement = workspaceElement.querySelector('[data-db-dock-search]');
  if (!searchSlotElement) return;
  const containerElement = editor.getContainer && editor.getContainer();
  const searchElement = containerElement && containerElement.querySelector('[data-db-block-search]');
  if (searchElement && searchElement.parentElement !== searchSlotElement) {
    searchSlotElement.appendChild(searchElement);
  }
  searchSlotElement.style.display = shouldShow && searchSlotElement.firstElementChild ? '' : 'none';
};

export default moveBlockSearchIntoDock;
