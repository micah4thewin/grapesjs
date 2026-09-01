import downloadSiteZipBundle from './downloadSiteZipBundle.js';
import getExporterEditorCss from './getExporterEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openExportModal from './openExportModal.js';
import openPublishModal from './openPublishModal.js';
import openSiteSettingsModal from './openSiteSettingsModal.js';
import registerCommandSet from '../support/registerCommandSet.js';

const applyExportSystem = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.exporter) || {};
  registerCommandSet(editor, {
    'db:open-export': (commandEditor) => openExportModal(commandEditor),
    'db:open-site-settings': (commandEditor) => openSiteSettingsModal(commandEditor),
    'db:download-site': (commandEditor, commandSender, commandOptions) =>
      downloadSiteZipBundle(commandEditor, (commandOptions || {}).buildOptions || moduleOptions.publishBuildOptions),
    'db:publish-site': (commandEditor, commandSender, commandOptions) =>
      openPublishModal(commandEditor, commandOptions || { buildOptions: moduleOptions.publishBuildOptions }),
  });
  const injectEditorSideStyles = () => injectEditorStylesOnce(editor, 'db-css-exporter-editor', getExporterEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applyExportSystem;
