import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import getSymbolRecord from './getSymbolRecord.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';
import showToastNotice from '../support/showToastNotice.js';

const runDetachSymbolCommand = (editor) => {
  const instanceComponent = findOwningSymbolInstance(editor.getSelected && editor.getSelected());
  if (!instanceComponent) {
    showToastNotice(editor, 'Select a reusable component first.', { kind: 'warning' });
    return;
  }
  const symbolRecord = getSymbolRecord(editor, resolveSymbolIdOfComponent(instanceComponent));
  const parentComponent = instanceComponent.parent ? instanceComponent.parent() : null;
  if (!parentComponent) return;
  setSymbolSubtreeLocked(instanceComponent, false);
  const definitionComponents = symbolRecord && Array.isArray(symbolRecord.components) ? symbolRecord.components : [];
  const insertIndex = parentComponent.components().indexOf(instanceComponent);
  const addedComponents = parentComponent.append(JSON.parse(JSON.stringify(definitionComponents)), { at: insertIndex });
  instanceComponent.remove();
  if (addedComponents && addedComponents[0]) editor.select(addedComponents[0]);
  showToastNotice(editor, 'This copy is now independent.');
};

export default runDetachSymbolCommand;
