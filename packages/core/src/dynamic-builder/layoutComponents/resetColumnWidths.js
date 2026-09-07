import listColumnChildren from './listColumnChildren.js';
import resolveColumnPresetForCount from './resolveColumnPresetForCount.js';

const resetColumnWidths = (columnsComponent) => {
  const columnCount = listColumnChildren(columnsComponent).length;
  const nextStyle = { ...(columnsComponent.getStyle ? columnsComponent.getStyle() : {}) };
  delete nextStyle['--db-col-template'];
  columnsComponent.setStyle(nextStyle);
  columnsComponent.addAttributes({ 'data-db-columns': resolveColumnPresetForCount(columnCount) || 'two' });
};

export default resetColumnWidths;
