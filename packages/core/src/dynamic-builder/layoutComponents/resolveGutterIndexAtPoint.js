import listColumnElements from './listColumnElements.js';

const resolveGutterIndexAtPoint = (columnsElement, pointerX, tolerance = 8) => {
  const columnElements = listColumnElements(columnsElement);
  for (let columnIndex = 0; columnIndex < columnElements.length - 1; columnIndex += 1) {
    const leftRect = columnElements[columnIndex].getBoundingClientRect();
    const rightRect = columnElements[columnIndex + 1].getBoundingClientRect();
    if (rightRect.left <= leftRect.right) continue;
    if (pointerX >= leftRect.right - tolerance && pointerX <= rightRect.left + tolerance) return columnIndex;
  }
  return -1;
};

export default resolveGutterIndexAtPoint;
