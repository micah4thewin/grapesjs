import injectDesignTokenStyles from './injectDesignTokenStyles.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import syncDesignKitFontStyles from './syncDesignKitFontStyles.js';

const watchSiteMetaForTokenChanges = (editor, moduleOptions) => {
  editor.on('db:site-meta:update', (siteMetaRecord) => {
    if (!isPlainRecord(siteMetaRecord)) return;
    syncDesignKitFontStyles(editor);
    if (!isPlainRecord(siteMetaRecord.designTokens)) return;
    const activeRecord = resolveActiveDesignTokens(editor, moduleOptions);
    if (JSON.stringify(activeRecord) === editor.getModel().get('dbDesignTokensSnapshot')) return;
    injectDesignTokenStyles(editor, activeRecord);
  });
};

export default watchSiteMetaForTokenChanges;
