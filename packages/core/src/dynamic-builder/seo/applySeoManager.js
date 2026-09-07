import getSeoEditorCss from './getSeoEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import mountSeoHealthChip from './mountSeoHealthChip.js';
import openSeoSettingsModal from './openSeoSettingsModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import runSeoHealthCheck from './runSeoHealthCheck.js';
import seedSiteSeoDefaults from './seedSiteSeoDefaults.js';
import watchPageContentForLastModified from './watchPageContentForLastModified.js';
import watchSeoHealthUpdates from './watchSeoHealthUpdates.js';

const applySeoManager = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.seo) || {};
  editor.getModel().set('dbSeoOptions', moduleOptions);
  seedSiteSeoDefaults(editor, moduleOptions);
  registerCommandSet(editor, {
    'db:open-seo-settings': (commandEditor, commandSender, commandOptions) =>
      openSeoSettingsModal(commandEditor, commandOptions),
    'db:seo-health': (commandEditor) => runSeoHealthCheck(commandEditor),
    'db:mount-seo-health-chip': (commandEditor) => mountSeoHealthChip(commandEditor),
  });
  watchPageContentForLastModified(editor);
  watchSeoHealthUpdates(editor);
  const injectEditorSideStyles = () => injectEditorStylesOnce(editor, 'db-css-seo-editor', getSeoEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) {
    editor.onReady(() => {
      injectEditorSideStyles();
      setTimeout(() => mountSeoHealthChip(editor), 0);
    });
  }
};

export default applySeoManager;
