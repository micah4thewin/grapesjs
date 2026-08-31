import getSeoEditorCss from './getSeoEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openSeoSettingsModal from './openSeoSettingsModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import seedSiteSeoDefaults from './seedSiteSeoDefaults.js';

const applySeoManager = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.seo) || {};
  seedSiteSeoDefaults(editor, moduleOptions);
  registerCommandSet(editor, {
    'db:open-seo-settings': (commandEditor) => openSeoSettingsModal(commandEditor),
  });
  const injectEditorSideStyles = () => injectEditorStylesOnce(editor, 'db-css-seo-editor', getSeoEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applySeoManager;
