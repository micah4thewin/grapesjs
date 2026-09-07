import deepMergeRecords from '../support/deepMergeRecords.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const captureTokenSnapshot = (editor) => {
  const siteMetaRecord = getSiteMetaRecord(editor);
  const storedKit = isPlainRecord(siteMetaRecord.designKit) ? siteMetaRecord.designKit : {};
  const storedTokens = isPlainRecord(siteMetaRecord.designTokens) ? siteMetaRecord.designTokens : {};
  return {
    designTokens: deepMergeRecords({}, storedTokens),
    designKit: {
      kitId: typeof storedKit.kitId === 'string' ? storedKit.kitId : '',
      fontFamilies: Array.isArray(storedKit.fontFamilies) ? storedKit.fontFamilies.slice() : [],
    },
  };
};

export default captureTokenSnapshot;
