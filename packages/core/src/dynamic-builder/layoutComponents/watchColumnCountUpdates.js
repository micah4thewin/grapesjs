import buildEqualColumnTemplate from './buildEqualColumnTemplate.js';
import getColumnPresetRecord from './getColumnPresetRecord.js';
import listColumnChildren from './listColumnChildren.js';
import resolveColumnPresetForCount from './resolveColumnPresetForCount.js';
import resolveColumnSyncGuard from './resolveColumnSyncGuard.js';

const watchColumnCountUpdates = (editor) => {
  const syncGuard = resolveColumnSyncGuard(editor);
  const syncPresetToCount = (columnComponent, isRemoval) => {
    if (!columnComponent || !columnComponent.is || !columnComponent.is('db-column')) return;
    const columnsComponent = columnComponent.parent && columnComponent.parent();
    if (!columnsComponent || !columnsComponent.is('db-columns') || syncGuard.has(columnsComponent)) return;
    const columnChildren = listColumnChildren(columnsComponent);
    if (isRemoval && columnChildren.indexOf(columnComponent) >= 0) return;
    const columnCount = columnChildren.length;
    if (!columnCount) return;
    const presetKey = String(columnsComponent.getAttributes()['data-db-columns'] || '');
    const presetEntry = getColumnPresetRecord()[presetKey];
    if (presetEntry && presetEntry.columnCount === columnCount) return;
    const matchingPreset = resolveColumnPresetForCount(columnCount);
    syncGuard.add(columnsComponent);
    try {
      if (!matchingPreset) columnsComponent.addStyle({ '--db-col-template': buildEqualColumnTemplate(columnCount) });
      columnsComponent.addAttributes({ 'data-db-columns': matchingPreset || 'custom' });
    } finally {
      syncGuard.delete(columnsComponent);
    }
  };
  editor.on('component:remove', (component) => syncPresetToCount(component, true));
  editor.on('component:add', (component, options) => {
    if (options && options.temporary) return;
    syncPresetToCount(component, false);
  });
};

export default watchColumnCountUpdates;
