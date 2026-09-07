import getThemedModalSession from './getThemedModalSession.js';
import moveFocusIntoModalDialog from './moveFocusIntoModalDialog.js';
import removeStaleModalShells from './removeStaleModalShells.js';
import resolveModalDialogElement from './resolveModalDialogElement.js';
import setThemedModalSession from './setThemedModalSession.js';
import wireModalDialogAccessibility from './wireModalDialogAccessibility.js';

const openThemedModal = (editor, modalTitle, modalContent, options = {}) => {
  const modalClassName = ['gjs-db-modal', options.className || ''].join(' ').trim();
  let safeContent = modalContent;
  if (modalContent && modalContent.nodeType === 1 && modalContent.ownerDocument) {
    const wrapperElement = modalContent.ownerDocument.createElement('div');
    wrapperElement.className = 'gjs-db-modal-shell';
    wrapperElement.appendChild(modalContent);
    safeContent = wrapperElement;
  }
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  const previousSession = editor.Modal.isOpen() ? getThemedModalSession(editor) : null;
  const openerElement = previousSession ? previousSession.openerElement : ownerDocument && ownerDocument.activeElement;
  if (previousSession && typeof previousSession.onClose === 'function') previousSession.onClose();
  wireModalDialogAccessibility(editor);
  setThemedModalSession(editor, {
    openerElement: openerElement || null,
    className: options.className || '',
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
  });
  editor.Modal.open({
    title: modalTitle,
    content: safeContent,
    attributes: { class: modalClassName },
  });
  removeStaleModalShells(editor, safeContent);
  const dialogElement = resolveModalDialogElement(editor);
  if (dialogElement) moveFocusIntoModalDialog(dialogElement);
  return editor.Modal;
};

export default openThemedModal;
