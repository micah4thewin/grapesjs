import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildExportSizeReport from './buildExportSizeReport.js';
import buildPublishSummaryMarkup from './buildPublishSummaryMarkup.js';
import focusFirstModalControl from '../support/focusFirstModalControl.js';
import getExporterEditorCss from './getExporterEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';
import runExportPreflight from './runExportPreflight.js';
import wirePublishModalActions from './wirePublishModalActions.js';

const openPublishModal = (editor, commandOptions) => {
  const optionsRecord = commandOptions || {};
  const buildOptions = { separateAssets: true, resolveBindings: true, ...(optionsRecord.buildOptions || {}) };
  const moduleOptions = optionsRecord.moduleOptions || {};
  const preflightRecord = optionsRecord.preflight || runExportPreflight(editor);
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return preflightRecord;
  injectEditorStylesOnce(editor, 'db-css-exporter-editor', getExporterEditorCss());
  const summaryMarkup = buildPublishSummaryMarkup(preflightRecord, {
    sizeReport: buildExportSizeReport(editor, buildOptions),
    hasPublishHook: typeof moduleOptions.onPublish === 'function',
  });
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, summaryMarkup);
  if (!rootElement) return preflightRecord;
  wirePublishModalActions(editor, rootElement, {
    buildOptions,
    preflightRecord,
    moduleOptions,
    reopenModal: (nextOptions) => openPublishModal(editor, { ...optionsRecord, ...(nextOptions || {}) }),
  });
  openThemedModal(editor, 'Check and download', rootElement, { className: 'gjs-db-publish-modal' });
  focusFirstModalControl(rootElement);
  return preflightRecord;
};

export default openPublishModal;
