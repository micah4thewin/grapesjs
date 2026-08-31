import injectDesignTokenStyles from './injectDesignTokenStyles.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const applyTokenRecordUpdate = (editor, moduleOptions, tokenRecord) => {
  updateSiteMetaRecord(editor, { designTokens: tokenRecord });
  injectDesignTokenStyles(editor, resolveActiveDesignTokens(editor, moduleOptions));
};

export default applyTokenRecordUpdate;
