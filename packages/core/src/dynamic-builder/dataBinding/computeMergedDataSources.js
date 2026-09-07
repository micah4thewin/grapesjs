import buildDefaultDataSources from './buildDefaultDataSources.js';
import mergeDataSourceRecords from './mergeDataSourceRecords.js';
import normalizeDataSourceRecord from './normalizeDataSourceRecord.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const computeMergedDataSources = (editor, moduleOptions) => {
  const optionSources = isPlainRecord(moduleOptions && moduleOptions.sources) ? moduleOptions.sources : {};
  const metaSources = getSiteMetaRecord(editor).dataSources;
  const seededSources = mergeDataSourceRecords(buildDefaultDataSources(), optionSources);
  return normalizeDataSourceRecord(mergeDataSourceRecords(seededSources, metaSources));
};

export default computeMergedDataSources;
