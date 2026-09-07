import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import hasSymbolPlaceholderOnly from './hasSymbolPlaceholderOnly.js';
import runSymbolUndoStep from './runSymbolUndoStep.js';
import serializeSymbolChildren from './serializeSymbolChildren.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';
import showToastNotice from '../support/showToastNotice.js';
import stripDefinitionElementIds from './stripDefinitionElementIds.js';

const runDetachSymbolCommand = (editor) => {
  const instanceComponent = findOwningSymbolInstance(editor.getSelected && editor.getSelected());
  if (!instanceComponent) {
    showToastNotice(editor, 'Select a reusable component first.', { kind: 'warning' });
    return;
  }
  const parentComponent = instanceComponent.parent ? instanceComponent.parent() : null;
  if (!parentComponent) return;
  setSymbolSubtreeLocked(instanceComponent, false);
  const detachedDefinitions = hasSymbolPlaceholderOnly(instanceComponent)
    ? []
    : serializeSymbolChildren(instanceComponent).map((childDefinition) => stripDefinitionElementIds(childDefinition));
  const insertIndex = parentComponent.components().indexOf(instanceComponent);
  runSymbolUndoStep(editor, () => {
    const addedComponents = parentComponent.append(detachedDefinitions, { at: insertIndex });
    instanceComponent.remove();
    if (addedComponents && addedComponents[0]) editor.select(addedComponents[0]);
  });
  showToastNotice(editor, 'This copy is now independent.');
};

export default runDetachSymbolCommand;
