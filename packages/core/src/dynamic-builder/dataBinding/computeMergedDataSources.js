import buildDefaultDataSources from './buildDefaultDataSources.js';
import normalizeDataSourceRecord from './normalizeDataSourceRecord.js';
import deepMergeRecords from '../support/deepMergeRecords.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const computeMergedDataSources = (editor, moduleOptions) => {
  const optionSources = isPlainRecord(moduleOptions && moduleOptions.sources) ? moduleOptions.sources : {};
  const metaSources = getSiteMetaRecord(editor).dataSources;
  const seededSources = deepMergeRecords(buildDefaultDataSources(), optionSources);
  const mergedSources = deepMergeRecords(seededSources, isPlainRecord(metaSources) ? metaSources : {});
  return normalizeDataSourceRecord(mergedSources);
};

export default computeMergedDataSources;
