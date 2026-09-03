import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const buildPreviewRowMarkup = (y, columnCount, options = {}) => {
  const startX = options.x === undefined ? 10 : options.x;
  const endX = options.width === undefined ? 76 : options.width;
  const gapWidth = options.gap === undefined ? 4 : options.gap;
  const rowHeight = options.height === undefined ? 18 : options.height;
  const columnWidth = (endX - gapWidth * (columnCount - 1)) / columnCount;
  return Array.from({ length: columnCount }, (unusedValue, columnIndex) =>
    buildPreviewShapeMarkup(startX + columnIndex * (columnWidth + gapWidth), y, columnWidth, rowHeight, options),
  ).join('');
};

export default buildPreviewRowMarkup;
