import injectDesignTokenStyles from './injectDesignTokenStyles.js';
import openTokenManagerModal from './openTokenManagerModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import watchSiteMetaForTokenChanges from './watchSiteMetaForTokenChanges.js';

const applyDesignTokens = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.designTokens) || {};
  injectDesignTokenStyles(editor, resolveActiveDesignTokens(editor, moduleOptions));
  watchSiteMetaForTokenChanges(editor, moduleOptions);
  registerCommandSet(editor, {
    'db:open-token-manager': {
      run: (editorInstance) => openTokenManagerModal(editorInstance, moduleOptions),
    },
  });
};

export default applyDesignTokens;
