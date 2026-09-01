import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildHistoryListMarkup from './buildHistoryListMarkup.js';
import jumpToHistoryIndex from './jumpToHistoryIndex.js';
import openThemedModal from '../support/openThemedModal.js';

const openHistoryModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const historyMarkup = [
    '<div class="gjs-db-form">',
    '<p class="gjs-db-muted">Click any step to jump the page back or forward to that moment.</p>',
    buildHistoryListMarkup(editor),
    '</div>',
  ].join('');
  const historyElement = buildElementFromMarkup(containerElement.ownerDocument, historyMarkup);
  if (!historyElement) return;
  historyElement.addEventListener('click', (clickEvent) => {
    const rowElement =
      clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('[data-db-history-index]') : null;
    if (!rowElement) return;
    jumpToHistoryIndex(editor, Number(rowElement.getAttribute('data-db-history-index')));
    editor.Modal.close();
  });
  openThemedModal(editor, 'Edit history', historyElement, { className: 'gjs-db-history-modal' });
};

export default openHistoryModal;
