import attachAuditReportHandlers from './attachAuditReportHandlers.js';
import buildAuditReportMarkup from './buildAuditReportMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import openThemedModal from '../support/openThemedModal.js';
import refreshReportElementMarkup from './refreshReportElementMarkup.js';

const openAuditReportModal = (editor, options) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const optionsRecord = options || {};
  const existingReport = containerElement.querySelector('[data-db-audit-report]');
  const isModalOpen = Boolean(editor.Modal && editor.Modal.isOpen && editor.Modal.isOpen());
  if (existingReport && isModalOpen) {
    return refreshReportElementMarkup(existingReport, buildAuditReportMarkup(editor), optionsRecord.focusSelector);
  }
  const reportElement = buildElementFromMarkup(containerElement.ownerDocument, buildAuditReportMarkup(editor));
  if (!reportElement) return null;
  attachAuditReportHandlers(editor, reportElement);
  openThemedModal(editor, 'Quality audits', reportElement, { className: 'gjs-db-audit-modal' });
  return reportElement;
};

export default openAuditReportModal;
