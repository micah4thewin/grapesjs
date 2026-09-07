import resolveEditorModel from './resolveEditorModel.js';

const getSymbolBaselineStore = (editorOrModel) => {
  const editorModel = resolveEditorModel(editorOrModel);
  if (!editorModel) return null;
  const existingStore = editorModel.get('dbSymbolLeafBaselines');
  if (existingStore) return existingStore;
  const baselineStore = new WeakMap();
  editorModel.set('dbSymbolLeafBaselines', baselineStore);
  return baselineStore;
};

export default getSymbolBaselineStore;
