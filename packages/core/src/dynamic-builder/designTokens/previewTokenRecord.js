import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import deepMergeRecords from '../support/deepMergeRecords.js';
import injectDesignTokenStyles from './injectDesignTokenStyles.js';

const previewTokenRecord = (editor, moduleOptions, tokenRecord) =>
  injectDesignTokenStyles(editor, deepMergeRecords(buildBaselineTokenRecord(moduleOptions), tokenRecord));

export default previewTokenRecord;
