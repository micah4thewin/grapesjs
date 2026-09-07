import injectDesignTokenStyles from './injectDesignTokenStyles.js';
import openDesignKitsModal from './openDesignKitsModal.js';
import openTokenManagerModal from './openTokenManagerModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerTokenUndoType from './registerTokenUndoType.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import syncDesignKitFontStyles from './syncDesignKitFontStyles.js';
import watchSiteMetaForTokenChanges from './watchSiteMetaForTokenChanges.js';

const applyDesignTokens = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.designTokens) || {};
  injectDesignTokenStyles(editor, resolveActiveDesignTokens(editor, moduleOptions));
  syncDesignKitFontStyles(editor);
  watchSiteMetaForTokenChanges(editor, moduleOptions);
  registerTokenUndoType(editor, moduleOptions);
  registerCommandSet(editor, {
    'db:open-token-manager': {
      run: (editorInstance) => openTokenManagerModal(editorInstance, moduleOptions),
    },
    'db:open-design-kits': {
      run: (editorInstance) => openDesignKitsModal(editorInstance, moduleOptions),
    },
  });
};

export default applyDesignTokens;
