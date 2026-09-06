import getSiteIdentityEditorCss from './getSiteIdentityEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openSiteIdentityModal from './openSiteIdentityModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import watchNewComponentsForBrand from './watchNewComponentsForBrand.js';

const applySiteIdentity = (editor, pluginOptions) => {
  const designTokenOptions = (pluginOptions && pluginOptions.designTokens) || {};
  registerCommandSet(editor, {
    'db:open-site-identity': (commandEditor) => openSiteIdentityModal(commandEditor, designTokenOptions),
  });
  watchNewComponentsForBrand(editor);
  const injectStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-site-identity', getSiteIdentityEditorCss());
  };
  injectStyles();
  if (editor.onReady) editor.onReady(() => injectStyles());
};

export default applySiteIdentity;
