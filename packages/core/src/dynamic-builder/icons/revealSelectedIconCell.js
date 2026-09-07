const revealSelectedIconCell = (resultsElement) => {
  if (!resultsElement) return false;
  const activeCell = resultsElement.querySelector('.gjs-db-icon-cell-active');
  if (!activeCell || typeof activeCell.scrollIntoView !== 'function') return false;
  activeCell.scrollIntoView({ block: 'center' });
  return true;
};

export default revealSelectedIconCell;
