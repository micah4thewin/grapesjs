import showToastNotice from '../support/showToastNotice.js';
import isDisposableColumn from './isDisposableColumn.js';

const removeSurplusColumns = (editor, surplusColumns, keptColumn) => {
  let movedCount = 0;
  surplusColumns.forEach((columnComponent) => {
    if (keptColumn && !isDisposableColumn(columnComponent)) {
      if (isDisposableColumn(keptColumn)) keptColumn.components().reset();
      const movedChildren = columnComponent.components().map((childComponent) => childComponent);
      keptColumn.append(movedChildren);
      movedCount += movedChildren.length;
    }
    columnComponent.remove();
  });
  if (movedCount) showToastNotice(editor, 'Your content was kept: it moved into the last remaining column.');
};

export default removeSurplusColumns;
