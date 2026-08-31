import buildDefaultDataSources from './buildDefaultDataSources.js';
import isPlainRecord from '../support/isPlainRecord.js';

const listDataSourceNames = (editorModel) => {
  const registryRecord = editorModel && editorModel.get ? editorModel.get('dbDataSources') : null;
  const sourcesRecord = isPlainRecord(registryRecord) ? registryRecord : buildDefaultDataSources();
  return Object.keys(sourcesRecord).sort();
};

export default listDataSourceNames;
