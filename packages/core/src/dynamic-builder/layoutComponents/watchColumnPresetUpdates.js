import getColumnPresetRecord from './getColumnPresetRecord.js';

const watchColumnPresetUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-columns', (component) => {
    if (!component || !component.is || !component.is('db-columns')) return;
    const presetEntry = getColumnPresetRecord()[component.getAttributes()['data-db-columns']];
    if (!presetEntry) return;
    const columnChildren = component.components().filter((child) => child.is && child.is('db-column'));
    const missingCount = presetEntry.columnCount - columnChildren.length;
    if (missingCount > 0) {
      component.append(Array.from({ length: missingCount }, () => ({ type: 'db-column' })));
      return;
    }
    if (missingCount < 0) {
      const isDisposableColumn = (columnComponent) =>
        columnComponent
          .components()
          .every((innerComponent) => (innerComponent.getClasses() || []).indexOf('db-layout-placeholder') >= 0);
      columnChildren
        .slice(presetEntry.columnCount)
        .filter(isDisposableColumn)
        .forEach((columnComponent) => columnComponent.remove());
    }
  });
};

export default watchColumnPresetUpdates;
