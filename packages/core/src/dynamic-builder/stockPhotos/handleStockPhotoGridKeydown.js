const readColumnCount = (cellElements) => {
  const firstOffset = cellElements[0].offsetTop;
  const wrapIndex = cellElements.findIndex((cellElement) => cellElement.offsetTop > firstOffset);
  return wrapIndex > 0 ? wrapIndex : cellElements.length;
};

const readNextIndex = (keyName, currentIndex, cellCount, columnCount) => {
  if (keyName === 'ArrowRight') return currentIndex + 1;
  if (keyName === 'ArrowLeft') return currentIndex - 1;
  if (keyName === 'ArrowDown') return currentIndex + columnCount;
  if (keyName === 'ArrowUp') return currentIndex - columnCount;
  if (keyName === 'Home') return 0;
  if (keyName === 'End') return cellCount - 1;
  return currentIndex;
};

const handleStockPhotoGridKeydown = (gridElement, keyEvent) => {
  if (!gridElement || !keyEvent || keyEvent.altKey || keyEvent.ctrlKey || keyEvent.metaKey) return false;
  const cellElements = [...gridElement.querySelectorAll('[data-db-stock-choose]')];
  const activeCell =
    keyEvent.target && keyEvent.target.closest ? keyEvent.target.closest('[data-db-stock-choose]') : null;
  const currentIndex = cellElements.indexOf(activeCell);
  if (!cellElements.length || currentIndex < 0) return false;
  const nextIndex = readNextIndex(keyEvent.key, currentIndex, cellElements.length, readColumnCount(cellElements));
  if (nextIndex === currentIndex) return false;
  const clampedIndex = Math.max(0, Math.min(cellElements.length - 1, nextIndex));
  if (keyEvent.preventDefault) keyEvent.preventDefault();
  cellElements[clampedIndex].focus();
  return true;
};

export default handleStockPhotoGridKeydown;
