import attachAuditReportHandlers from './attachAuditReportHandlers.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildPreflightMarkup from './buildPreflightMarkup.js';
import handlePreflightClick from './handlePreflightClick.js';
import openThemedModal from '../support/openThemedModal.js';
import refreshReportElementMarkup from './refreshReportElementMarkup.js';

const openPreflightModal = (editor, preflightResult, options) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const editorModel = editor.getModel();
  const optionsRecord = options || {};
  const flowOptions = optionsRecord.refresh ? editorModel.get('dbPreflightOptions') || {} : optionsRecord;
  editorModel.set('dbPreflightOptions', flowOptions);
  const preflightMarkup = buildPreflightMarkup(preflightResult, flowOptions);
  const hostElement = flowOptions.renderInto || null;
  const searchRoot = hostElement || containerElement;
  const existingRoot = searchRoot.querySelector('[data-db-preflight-root]');
  const isModalOpen = Boolean(editor.Modal && editor.Modal.isOpen && editor.Modal.isOpen());
  if (existingRoot && (hostElement || isModalOpen)) {
    return refreshReportElementMarkup(existingRoot, preflightMarkup, '[data-db-audit-run="db:run-preflight"]');
  }
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, preflightMarkup);
  if (!rootElement) return null;
  attachAuditReportHandlers(editor, rootElement);
  rootElement.addEventListener('click', (clickEvent) => handlePreflightClick(editor, clickEvent));
  if (hostElement) {
    hostElement.innerHTML = '';
    hostElement.appendChild(rootElement);
    return rootElement;
  }
  openThemedModal(editor, 'Publish checklist', rootElement, { className: 'gjs-db-preflight-modal' });
  return rootElement;
};

export default openPreflightModal;
