import refreshDataSourceRegistry from './refreshDataSourceRegistry.js';
import setDataSourcesDraft from './setDataSourcesDraft.js';
import writeDataSourcesSiteMeta from './writeDataSourcesSiteMeta.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const updateDataSourceRegistry = (editor, sourcesPatch) => {
  const currentSources = getSiteMetaRecord(editor).dataSources;
  const nextSources = { ...(isPlainRecord(currentSources) ? currentSources : {}) };
  Object.keys(isPlainRecord(sourcesPatch) ? sourcesPatch : {}).forEach((sourceName) => {
    nextSources[sourceName] = sourcesPatch[sourceName];
  });
  setDataSourcesDraft(editor, null, { silent: true });
  writeDataSourcesSiteMeta(editor, nextSources);
  return refreshDataSourceRegistry(editor);
};

export default updateDataSourceRegistry;
