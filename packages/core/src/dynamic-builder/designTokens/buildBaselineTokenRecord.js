import buildDefaultDesignTokens from './buildDefaultDesignTokens.js';
import deepMergeRecords from '../support/deepMergeRecords.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildBaselineTokenRecord = (moduleOptions) => {
  const optionTokens = moduleOptions && isPlainRecord(moduleOptions.tokens) ? moduleOptions.tokens : {};
  return deepMergeRecords(buildDefaultDesignTokens(), optionTokens);
};

export default buildBaselineTokenRecord;
