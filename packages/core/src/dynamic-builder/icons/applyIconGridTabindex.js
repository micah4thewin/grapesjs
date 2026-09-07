const applyIconGridTabindex = (resultsElement) => {
  if (!resultsElement) return null;
  const cellElements = resultsElement.querySelectorAll('[data-db-icon-choice]');
  const activeCell = resultsElement.querySelector('.gjs-db-icon-cell-active') || cellElements[0] || null;
  cellElements.forEach((cellElement) => cellElement.setAttribute('tabindex', cellElement === activeCell ? '0' : '-1'));
  return activeCell;
};

export default applyIconGridTabindex;
