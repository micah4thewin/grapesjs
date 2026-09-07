import isPlainRecord from '../support/isPlainRecord.js';
import resolveEditorModel from './resolveEditorModel.js';

const getSymbolEditingRegistry = (editorOrModel) => {
  const editorModel = resolveEditorModel(editorOrModel);
  const storedRegistry = editorModel ? editorModel.get('dbSymbolEditingIds') : null;
  return isPlainRecord(storedRegistry) ? storedRegistry : {};
};

export default getSymbolEditingRegistry;
