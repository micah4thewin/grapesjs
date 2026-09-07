import buildEqualColumnTemplate from './buildEqualColumnTemplate.js';
import getColumnPresetRecord from './getColumnPresetRecord.js';
import listColumnChildren from './listColumnChildren.js';
import removeSurplusColumns from './removeSurplusColumns.js';
import resolveColumnSyncGuard from './resolveColumnSyncGuard.js';

const syncCustomTemplate = (component, columnCount) => {
  const currentStyle = component.getStyle ? component.getStyle() : {};
  if (!currentStyle['--db-col-template'])
    component.addStyle({ '--db-col-template': buildEqualColumnTemplate(columnCount) });
};

const watchColumnPresetUpdates = (editor) => {
  const syncGuard = resolveColumnSyncGuard(editor);
  editor.on('component:update:attributes:data-db-columns', (component) => {
    if (!component || !component.is || !component.is('db-columns') || syncGuard.has(component)) return;
    const presetEntry = getColumnPresetRecord()[component.getAttributes()['data-db-columns']];
    if (!presetEntry) return;
    const columnChildren = listColumnChildren(component);
    if (!presetEntry.columnCount) {
      syncCustomTemplate(component, columnChildren.length);
      return;
    }
    const missingCount = presetEntry.columnCount - columnChildren.length;
    if (!missingCount) return;
    syncGuard.add(component);
    try {
      if (missingCount > 0) component.append(Array.from({ length: missingCount }, () => ({ type: 'db-column' })));
      else {
        const keptColumn = columnChildren[presetEntry.columnCount - 1];
        removeSurplusColumns(editor, columnChildren.slice(presetEntry.columnCount), keptColumn);
      }
    } finally {
      syncGuard.delete(component);
    }
  });
};

export default watchColumnPresetUpdates;
