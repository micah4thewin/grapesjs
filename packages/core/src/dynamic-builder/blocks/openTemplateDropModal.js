import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import focusFirstModalControl from '../support/focusFirstModalControl.js';
import openThemedModal from '../support/openThemedModal.js';
import showToastNotice from '../support/showToastNotice.js';
import removeDuplicatePageChrome from './removeDuplicatePageChrome.js';
import removeOtherRootComponents from './removeOtherRootComponents.js';

const openTemplateDropModal = (editor, blockModel, droppedComponents) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const templateLabel = escapeHtmlText(String(blockModel.get('label') || 'template'));
  const modalMarkup = [
    '<div class="gjs-db-form">',
    `<p class="gjs-db-muted">This page already had content before you dropped the ${templateLabel}. Replace the page with the template, or keep both?</p>`,
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-template-drop="replace" data-db-autofocus>Replace page content</button>',
    '<button type="button" class="gjs-db-button" data-db-template-drop="keep">Keep both</button>',
    '</div>',
    '<p class="gjs-db-field-help">Keep both drops a second navigation bar or footer from the template when your page already has one. Undo with Ctrl+Z at any time.</p>',
    '</div>',
  ].join('');
  const modalElement = buildElementFromMarkup(containerElement.ownerDocument, modalMarkup);
  if (!modalElement) return null;
  const runDropChoice = (choiceName) => {
    editor.Modal.close();
    if (choiceName === 'replace') {
      removeOtherRootComponents(editor, droppedComponents);
      showToastNotice(editor, 'This page now uses the ' + String(blockModel.get('label')) + '.', { kind: 'success' });
      return;
    }
    const keptLabels = removeDuplicatePageChrome(editor, droppedComponents);
    keptLabels.length && showToastNotice(editor, 'Kept your existing ' + keptLabels.join(' and ') + '.');
  };
  modalElement.querySelectorAll('[data-db-template-drop]').forEach((choiceButton) => {
    choiceButton.addEventListener('click', () => runDropChoice(choiceButton.getAttribute('data-db-template-drop')));
  });
  openThemedModal(editor, 'Use this template?', modalElement, { className: 'gjs-db-template-drop-modal' });
  focusFirstModalControl(modalElement);
  return modalElement;
};

export default openTemplateDropModal;
