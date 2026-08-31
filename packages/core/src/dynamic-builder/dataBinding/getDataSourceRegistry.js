import refreshDataSourceRegistry from './refreshDataSourceRegistry.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getDataSourceRegistry = (editor) => {
  const registryRecord = editor.getModel().get('dbDataSources');
  return isPlainRecord(registryRecord) ? registryRecord : refreshDataSourceRegistry(editor);
};

export default getDataSourceRegistry;
