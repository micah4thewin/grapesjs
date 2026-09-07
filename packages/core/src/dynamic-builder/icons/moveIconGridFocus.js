const moveIconGridFocus = (resultsElement, currentCell, keyName) => {
  const cellList = Array.prototype.slice.call(resultsElement.querySelectorAll('[data-db-icon-choice]'));
  const currentIndex = cellList.indexOf(currentCell);
  if (currentIndex < 0) return null;
  const gridElement = currentCell.parentElement;
  const gridWidth = gridElement ? gridElement.clientWidth : 0;
  const columnCount = Math.max(1, Math.round(gridWidth / Math.max(1, currentCell.offsetWidth || 1)));
  const offsetByKey = {
    ArrowRight: 1,
    ArrowLeft: -1,
    ArrowDown: columnCount,
    ArrowUp: -columnCount,
    Home: -currentIndex,
    End: cellList.length - 1 - currentIndex,
  };
  if (offsetByKey[keyName] === undefined) return null;
  const nextIndex = Math.max(0, Math.min(cellList.length - 1, currentIndex + offsetByKey[keyName]));
  return nextIndex === currentIndex ? null : cellList[nextIndex];
};

export default moveIconGridFocus;
