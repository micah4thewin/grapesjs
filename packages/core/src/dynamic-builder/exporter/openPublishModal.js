import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildPublishSummaryMarkup from './buildPublishSummaryMarkup.js';
import downloadSiteZipBundle from './downloadSiteZipBundle.js';
import getExporterEditorCss from './getExporterEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';
import runPublishAuditSummaries from './runPublishAuditSummaries.js';

const openPublishModal = (editor, commandOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return [];
  const optionsRecord = commandOptions || {};
  const buildOptions = optionsRecord.buildOptions || { separateAssets: true, resolveBindings: true };
  const auditSummaries = runPublishAuditSummaries(editor);
  injectEditorStylesOnce(editor, 'db-css-exporter-editor', getExporterEditorCss());
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, buildPublishSummaryMarkup(auditSummaries));
  if (!rootElement) return auditSummaries;
  const continueButton = rootElement.querySelector('[data-db-publish-continue]');
  if (continueButton) {
    continueButton.addEventListener('click', () => {
      downloadSiteZipBundle(editor, buildOptions);
      editor.Modal.close();
    });
  }
  const reportButton = rootElement.querySelector('[data-db-publish-report]');
  if (reportButton) reportButton.addEventListener('click', () => editor.runCommand('db:open-audit-report'));
  openThemedModal(editor, 'Publish site', rootElement, { className: 'gjs-db-publish-modal' });
  return auditSummaries;
};

export default openPublishModal;
