import attachAuditReportHandlers from './attachAuditReportHandlers.js';
import buildAuditReportMarkup from './buildAuditReportMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import openThemedModal from '../support/openThemedModal.js';

const openAuditReportModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const reportElement = buildElementFromMarkup(containerElement.ownerDocument, buildAuditReportMarkup(editor));
  if (!reportElement) return;
  attachAuditReportHandlers(editor, reportElement);
  openThemedModal(editor, 'Quality audits', reportElement, { className: 'gjs-db-audit-modal' });
};

export default openAuditReportModal;
