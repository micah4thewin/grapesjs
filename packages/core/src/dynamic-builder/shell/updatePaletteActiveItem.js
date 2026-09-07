const updatePaletteActiveItem = (listElement, activeIndex, shouldScroll) => {
  let activeElement = null;
  listElement.querySelectorAll('[data-db-palette-index]').forEach((itemElement) => {
    const isActive = Number(itemElement.getAttribute('data-db-palette-index')) === activeIndex;
    itemElement.setAttribute('aria-selected', isActive ? 'true' : 'false');
    if (isActive) activeElement = itemElement;
  });
  if (shouldScroll && activeElement && activeElement.scrollIntoView) activeElement.scrollIntoView({ block: 'nearest' });
  return activeElement;
};

export default updatePaletteActiveItem;
