import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import getIconMarkup from '../support/getIconMarkup.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';

const buildToolbarEntry = (commandId, labelText, iconName) => ({
  attributes: { title: labelText, 'data-db-symbol-toolbar': 'true' },
  label: getIconMarkup(iconName, { size: 15, label: labelText }),
  command: commandId,
});

const withoutSymbolEntries = (toolbarItems) =>
  toolbarItems.filter(
    (toolbarEntry) => !(toolbarEntry && toolbarEntry.attributes && toolbarEntry.attributes['data-db-symbol-toolbar']),
  );

const wireSymbolToolbarActions = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
    const toolbarItems = withoutSymbolEntries([...(selectedComponent.get('toolbar') || [])]);
    const instanceComponent = findOwningSymbolInstance(selectedComponent);
    if (instanceComponent === selectedComponent) {
      const isEditing = isSymbolInstanceEditing(selectedComponent);
      const editLabel = isEditing ? 'Done editing everywhere' : 'Edit everywhere';
      toolbarItems.unshift(buildToolbarEntry('db:edit-symbol', editLabel, isEditing ? 'check' : 'edit'));
      selectedComponent.set('toolbar', toolbarItems, { avoidStore: true });
      return;
    }
    if (instanceComponent) return;
    if (selectedComponent.get('type') === 'wrapper') return;
    toolbarItems.push(buildToolbarEntry('db:create-symbol', 'Make reusable', 'symbols'));
    selectedComponent.set('toolbar', toolbarItems, { avoidStore: true });
  });
};

export default wireSymbolToolbarActions;
