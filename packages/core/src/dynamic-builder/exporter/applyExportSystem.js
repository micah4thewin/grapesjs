import getExporterEditorCss from './getExporterEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openExportModal from './openExportModal.js';
import openExportPreview from './openExportPreview.js';
import openPublishModal from './openPublishModal.js';
import openSiteSettingsModal from './openSiteSettingsModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import runDownloadSiteCommand from './runDownloadSiteCommand.js';
import warnAboutStrippedSlotScripts from './warnAboutStrippedSlotScripts.js';

const applyExportSystem = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.exporter) || {};
  registerCommandSet(editor, {
    'db:open-export': (commandEditor) => openExportModal(commandEditor),
    'db:open-site-settings': (commandEditor) => openSiteSettingsModal(commandEditor),
    'db:download-site': (commandEditor, commandSender, commandOptions) =>
      runDownloadSiteCommand(commandEditor, commandOptions || {}, moduleOptions),
    'db:publish-site': (commandEditor, commandSender, commandOptions) =>
      openPublishModal(commandEditor, {
        buildOptions: moduleOptions.publishBuildOptions,
        ...(commandOptions || {}),
        moduleOptions,
      }),
    'db:preview-export': (commandEditor, commandSender, commandOptions) =>
      openExportPreview(commandEditor, (commandOptions || {}).buildOptions || moduleOptions.publishBuildOptions),
  });
  warnAboutStrippedSlotScripts(editor);
  const injectEditorSideStyles = () => injectEditorStylesOnce(editor, 'db-css-exporter-editor', getExporterEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applyExportSystem;
