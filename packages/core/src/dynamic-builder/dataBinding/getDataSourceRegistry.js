import refreshDataSourceRegistry from './refreshDataSourceRegistry.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getDataSourceRegistry = (editor) => {
  const editorModel = editor.getModel();
  const draftRecord = editorModel.get('dbDataSourcesDraft');
  if (isPlainRecord(draftRecord)) return draftRecord;
  const registryRecord = editorModel.get('dbDataSources');
  return isPlainRecord(registryRecord) ? registryRecord : refreshDataSourceRegistry(editor);
};

export default getDataSourceRegistry;
