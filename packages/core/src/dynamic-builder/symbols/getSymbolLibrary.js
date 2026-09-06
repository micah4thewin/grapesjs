import isPlainRecord from '../support/isPlainRecord.js';
import resolveEditorModel from './resolveEditorModel.js';

const getSymbolLibrary = (editorOrModel) => {
  const editorModel = resolveEditorModel(editorOrModel);
  const siteMetaRecord = editorModel ? editorModel.get('dbSiteMeta') : null;
  const storedLibrary = isPlainRecord(siteMetaRecord) ? siteMetaRecord.symbols : null;
  return isPlainRecord(storedLibrary) ? storedLibrary : {};
};

export default getSymbolLibrary;
