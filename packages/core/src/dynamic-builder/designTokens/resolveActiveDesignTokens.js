import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import deepMergeRecords from '../support/deepMergeRecords.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveActiveDesignTokens = (editor, moduleOptions) => {
  const siteMetaRecord = getSiteMetaRecord(editor);
  const storedTokens = isPlainRecord(siteMetaRecord.designTokens) ? siteMetaRecord.designTokens : {};
  return deepMergeRecords(buildBaselineTokenRecord(moduleOptions), storedTokens);
};

export default resolveActiveDesignTokens;
