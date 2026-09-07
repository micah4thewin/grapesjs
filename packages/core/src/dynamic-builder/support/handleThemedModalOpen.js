import getThemedModalSession from './getThemedModalSession.js';
import moveFocusIntoModalDialog from './moveFocusIntoModalDialog.js';
import resolveModalDialogElement from './resolveModalDialogElement.js';
import setThemedModalSession from './setThemedModalSession.js';

const handleThemedModalOpen = (editor) => {
  if (getThemedModalSession(editor)) return;
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return;
  setThemedModalSession(editor, { openerElement: ownerDocument.activeElement || null, className: '', onClose: null });
  setTimeout(() => {
    if (!editor.Modal || !editor.Modal.isOpen()) return;
    const dialogElement = resolveModalDialogElement(editor);
    if (!dialogElement || dialogElement.contains(ownerDocument.activeElement)) return;
    moveFocusIntoModalDialog(dialogElement);
  }, 0);
};

export default handleThemedModalOpen;
