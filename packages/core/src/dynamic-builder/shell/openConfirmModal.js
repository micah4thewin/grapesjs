import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import openThemedModal from '../support/openThemedModal.js';

const openConfirmModal = (editor, modalTitle, messageText, confirmLabel, onConfirm) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const confirmMarkup = [
    '<div class="gjs-db-form">',
    `<p class="gjs-db-muted">${escapeHtmlText(messageText)}</p>`,
    '<div class="gjs-db-button-row">',
    `<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-confirm-accept>${escapeHtmlText(confirmLabel)}</button>`,
    '<button type="button" class="gjs-db-button" data-db-confirm-cancel>Cancel</button>',
    '</div>',
    '</div>',
  ].join('');
  const confirmElement = buildElementFromMarkup(containerElement.ownerDocument, confirmMarkup);
  if (!confirmElement) return;
  confirmElement.querySelector('[data-db-confirm-accept]').addEventListener('click', () => {
    editor.Modal.close();
    onConfirm();
  });
  confirmElement.querySelector('[data-db-confirm-cancel]').addEventListener('click', () => editor.Modal.close());
  openThemedModal(editor, modalTitle, confirmElement, { className: 'gjs-db-confirm-modal' });
};

export default openConfirmModal;
