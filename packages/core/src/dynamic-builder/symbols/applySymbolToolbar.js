import buildSymbolToolbarEntry from './buildSymbolToolbarEntry.js';
import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import hasSymbolLeafOverride from './hasSymbolLeafOverride.js';
import insertSectionAfterComponent from '../layoutComponents/insertSectionAfterComponent.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import isSymbolRootSection from './isSymbolRootSection.js';
import runSilentSymbolRender from './runSilentSymbolRender.js';
import syncToolbarEntriesWithAbilities from './syncToolbarEntriesWithAbilities.js';

const withoutSymbolEntries = (toolbarItems) =>
  toolbarItems.filter(
    (toolbarEntry) => !(toolbarEntry && toolbarEntry.attributes && toolbarEntry.attributes['data-db-symbol-toolbar']),
  );

const applyInstanceToolbar = (editor, instanceComponent, toolbarItems) => {
  const isEditing = isSymbolInstanceEditing(instanceComponent);
  const editLabel = isEditing ? 'Done editing everywhere' : 'Edit everywhere';
  toolbarItems.unshift(buildSymbolToolbarEntry('db:edit-symbol', editLabel, isEditing ? 'check' : 'edit'));
  if (isEditing || !isSymbolRootSection(editor, instanceComponent)) return;
  const addSectionBelow = () => insertSectionAfterComponent(editor, instanceComponent);
  toolbarItems.push(buildSymbolToolbarEntry(addSectionBelow, 'Add section below', 'plus'));
};

const applySymbolToolbar = (editor, selectedComponent) => {
  if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
  runSilentSymbolRender(editor, () => {
    const instanceComponent = findOwningSymbolInstance(selectedComponent);
    const isInsideInstance = Boolean(instanceComponent) && instanceComponent !== selectedComponent;
    const storedItems = withoutSymbolEntries([...(selectedComponent.get('toolbar') || [])]);
    const toolbarItems = isInsideInstance
      ? syncToolbarEntriesWithAbilities(editor, selectedComponent, storedItems)
      : storedItems;
    if (instanceComponent === selectedComponent) {
      applyInstanceToolbar(editor, selectedComponent, toolbarItems);
    } else if (isInsideInstance && hasSymbolLeafOverride(instanceComponent, selectedComponent)) {
      toolbarItems.unshift(
        buildSymbolToolbarEntry('db:reset-symbol-override', 'Reset to match other copies', 'refresh'),
      );
    } else if (!instanceComponent && selectedComponent.get('type') !== 'wrapper') {
      toolbarItems.push(buildSymbolToolbarEntry('db:create-symbol', 'Make reusable', 'symbols'));
    }
    selectedComponent.set('toolbar', toolbarItems, { avoidStore: true });
  });
};

export default applySymbolToolbar;
