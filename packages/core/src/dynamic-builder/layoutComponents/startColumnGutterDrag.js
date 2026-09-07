import buildColumnTemplateFromWidths from './buildColumnTemplateFromWidths.js';
import createGutterTooltip from './createGutterTooltip.js';
import listColumnElements from './listColumnElements.js';
import resolveColumnPairWidths from './resolveColumnPairWidths.js';

const startColumnGutterDrag = (editor, columnsComponent, columnsElement, gutterIndex, startEvent) => {
  const ownerDocument = columnsElement.ownerDocument;
  const startWidths = listColumnElements(columnsElement).map(
    (columnElement) => columnElement.getBoundingClientRect().width,
  );
  const startX = startEvent.clientX;
  const tooltip = createGutterTooltip(ownerDocument);
  let latestTemplate = '';
  ownerDocument.body.classList.add('db-gutter-dragging');
  if (columnsComponent.getAttributes()['data-db-columns'] !== 'custom') {
    columnsComponent.addAttributes({ 'data-db-columns': 'custom' });
  }
  const applyWidths = (moveEvent, isFinal) => {
    const nextWidths = resolveColumnPairWidths(startWidths, gutterIndex, moveEvent.clientX - startX);
    latestTemplate = buildColumnTemplateFromWidths(nextWidths);
    columnsComponent.addStyle({ '--db-col-template': latestTemplate }, { avoidStore: !isFinal });
    const pairTotal = nextWidths[gutterIndex] + nextWidths[gutterIndex + 1];
    const leftPercent = Math.round((nextWidths[gutterIndex] / pairTotal) * 100);
    tooltip.update(moveEvent.clientX, moveEvent.clientY, leftPercent, 100 - leftPercent);
  };
  const handleMove = (moveEvent) => applyWidths(moveEvent, false);
  const handleUp = (upEvent) => {
    ownerDocument.removeEventListener('mousemove', handleMove, true);
    ownerDocument.removeEventListener('mouseup', handleUp, true);
    ownerDocument.body.classList.remove('db-gutter-dragging');
    tooltip.remove();
    applyWidths(upEvent, true);
    editor.select(columnsComponent);
  };
  ownerDocument.addEventListener('mousemove', handleMove, true);
  ownerDocument.addEventListener('mouseup', handleUp, true);
  applyWidths(startEvent, false);
};

export default startColumnGutterDrag;
