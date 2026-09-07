import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import openThemedModal from '../support/openThemedModal.js';
import saveSeoModalValues from './saveSeoModalValues.js';

const openSeoUnsavedChangesModal = (editor, rootElement, refreshLiveFeedback, reopenModal) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const promptMarkup = [
    '<div class="gjs-db-form gjs-db-seo-unsaved">',
    '<p class="gjs-db-muted">You changed SEO settings that are not saved yet.</p>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-seo-unsaved-save>Save changes</button>',
    '<button type="button" class="gjs-db-button" data-db-seo-unsaved-discard>Discard</button>',
    '<button type="button" class="gjs-db-button" data-db-seo-unsaved-edit>Keep editing</button>',
    '</div>',
    '</div>',
  ].join('');
  const promptElement = buildElementFromMarkup(containerElement.ownerDocument, promptMarkup);
  if (!promptElement) return;
  let promptChoice = '';
  promptElement.addEventListener('click', (clickEvent) => {
    const clickedElement = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!clickedElement) return;
    if (clickedElement.closest('[data-db-seo-unsaved-save]')) {
      promptChoice = 'save';
      reopenModal();
      saveSeoModalValues(editor, rootElement, refreshLiveFeedback);
    } else if (clickedElement.closest('[data-db-seo-unsaved-discard]')) {
      promptChoice = 'discard';
      rootElement.dataset.dbSeoResolved = 'true';
      editor.Modal.close();
    } else if (clickedElement.closest('[data-db-seo-unsaved-edit]')) {
      promptChoice = 'edit';
      reopenModal();
    }
  });
  openThemedModal(editor, 'Unsaved SEO changes', promptElement, { className: 'gjs-db-confirm-modal' });
  editor.Modal.onceClose(() => {
    if (!promptChoice) setTimeout(reopenModal, 0);
  });
};

export default openSeoUnsavedChangesModal;
