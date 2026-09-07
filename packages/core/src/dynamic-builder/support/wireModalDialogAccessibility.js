import applyModalDialogSemantics from './applyModalDialogSemantics.js';
import getModalAccessibilityCss from './getModalAccessibilityCss.js';
import handleModalDialogKeydown from './handleModalDialogKeydown.js';
import handleThemedModalClose from './handleThemedModalClose.js';
import handleThemedModalOpen from './handleThemedModalOpen.js';
import injectEditorStylesOnce from './injectEditorStylesOnce.js';
import resolveModalDialogElement from './resolveModalDialogElement.js';
import upgradeModalCloseButton from './upgradeModalCloseButton.js';

const wireModalDialogAccessibility = (editor) => {
  const editorModel = editor.getModel && editor.getModel();
  if (!editorModel) return null;
  if (!editorModel.get('dbModalAccessibilityWired')) {
    editorModel.set('dbModalAccessibilityWired', true, { silent: true });
    editor.on('modal:open', () => handleThemedModalOpen(editor));
    editor.on('modal:close', () => handleThemedModalClose(editor));
  }
  const dialogElement = resolveModalDialogElement(editor);
  if (!dialogElement || dialogElement.getAttribute('data-db-dialog-wired') === 'true') return dialogElement;
  dialogElement.setAttribute('data-db-dialog-wired', 'true');
  injectEditorStylesOnce(editor, 'db-css-modal-dialog-a11y', getModalAccessibilityCss());
  applyModalDialogSemantics(dialogElement);
  upgradeModalCloseButton(dialogElement);
  dialogElement.addEventListener('keydown', (keyEvent) => handleModalDialogKeydown(editor, dialogElement, keyEvent));
  return dialogElement;
};

export default wireModalDialogAccessibility;
