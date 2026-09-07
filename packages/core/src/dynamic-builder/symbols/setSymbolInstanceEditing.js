import applySymbolElementFlag from './applySymbolElementFlag.js';
import getSymbolEditingRegistry from './getSymbolEditingRegistry.js';
import resolveEditorModel from './resolveEditorModel.js';

const setSymbolInstanceEditing = (instanceComponent, isEditing) => {
  const editorModel = resolveEditorModel(instanceComponent && instanceComponent.em);
  if (!editorModel || !instanceComponent.cid) return;
  const nextRegistry = { ...getSymbolEditingRegistry(editorModel) };
  if (isEditing) nextRegistry[instanceComponent.cid] = true;
  else delete nextRegistry[instanceComponent.cid];
  editorModel.set('dbSymbolEditingIds', nextRegistry);
  applySymbolElementFlag(instanceComponent, 'data-db-symbol-editing', isEditing);
};

export default setSymbolInstanceEditing;
