import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import findOwningSymbolLeaf from './findOwningSymbolLeaf.js';
import getSymbolOverrides from './getSymbolOverrides.js';
import getSymbolRecord from './getSymbolRecord.js';
import lockSymbolComponentTree from './lockSymbolComponentTree.js';
import replaceSymbolLeafComponent from './replaceSymbolLeafComponent.js';
import resolveDefinitionAtPath from './resolveDefinitionAtPath.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import resolveSymbolLeafPath from './resolveSymbolLeafPath.js';
import setSymbolOverrides from './setSymbolOverrides.js';
import showToastNotice from '../support/showToastNotice.js';

const runResetSymbolOverrideCommand = (editor) => {
  const selectedComponent = editor.getSelected && editor.getSelected();
  const instanceComponent = findOwningSymbolInstance(selectedComponent);
  if (!instanceComponent || instanceComponent === selectedComponent) {
    showToastNotice(editor, 'Select a changed text or image inside a reusable component first.', { kind: 'warning' });
    return;
  }
  const leafComponent = findOwningSymbolLeaf(selectedComponent, instanceComponent);
  const leafPath = leafComponent ? resolveSymbolLeafPath(instanceComponent, leafComponent) : '';
  const symbolRecord = getSymbolRecord(editor, resolveSymbolIdOfComponent(instanceComponent));
  const masterDefinition = symbolRecord ? resolveDefinitionAtPath(symbolRecord.components, leafPath) : null;
  const nextOverrides = { ...getSymbolOverrides(instanceComponent) };
  if (!leafPath || !nextOverrides[leafPath] || !masterDefinition) {
    showToastNotice(editor, 'This copy already matches the other copies.');
    return;
  }
  delete nextOverrides[leafPath];
  setSymbolOverrides(instanceComponent, nextOverrides);
  const restoredLeaf = replaceSymbolLeafComponent(leafComponent, masterDefinition);
  if (restoredLeaf) {
    lockSymbolComponentTree(restoredLeaf, true, false);
    editor.select(restoredLeaf);
  }
  showToastNotice(editor, 'Back in step with the other copies.', { kind: 'success' });
};

export default runResetSymbolOverrideCommand;
