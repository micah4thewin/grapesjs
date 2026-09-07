import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import injectDesignTokenStyles from './injectDesignTokenStyles.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import syncDesignKitFontStyles from './syncDesignKitFontStyles.js';

const restoreTokenSnapshot = (editor, moduleOptions, tokenSnapshot) => {
  const safeSnapshot = tokenSnapshot || {};
  const nextMetaRecord = {
    ...getSiteMetaRecord(editor),
    designTokens: safeSnapshot.designTokens || {},
    designKit: safeSnapshot.designKit || { kitId: '', fontFamilies: [] },
  };
  replaceSiteMetaRecord(editor, nextMetaRecord);
  syncDesignKitFontStyles(editor);
  injectDesignTokenStyles(editor, resolveActiveDesignTokens(editor, moduleOptions));
};

export default restoreTokenSnapshot;
