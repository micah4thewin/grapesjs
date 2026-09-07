import getThemedModalSession from './getThemedModalSession.js';
import removeStaleModalShells from './removeStaleModalShells.js';
import resolveModalDialogElement from './resolveModalDialogElement.js';
import setThemedModalSession from './setThemedModalSession.js';

const handleThemedModalClose = (editor) => {
  const sessionRecord = getThemedModalSession(editor) || {};
  setThemedModalSession(editor, null);
  removeStaleModalShells(editor, null);
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  const dialogElement = resolveModalDialogElement(editor);
  const activeElement = ownerDocument ? ownerDocument.activeElement : null;
  const focusNeedsRestoring =
    !activeElement ||
    activeElement === (ownerDocument && ownerDocument.body) ||
    Boolean(dialogElement && dialogElement.contains(activeElement));
  const openerElement = sessionRecord.openerElement;
  const openerIsFocusable =
    Boolean(openerElement) &&
    openerElement.isConnected &&
    typeof openerElement.focus === 'function' &&
    openerElement !== (ownerDocument && ownerDocument.body);
  if (focusNeedsRestoring && openerIsFocusable) openerElement.focus({ preventScroll: true });
  if (typeof sessionRecord.onClose === 'function') sessionRecord.onClose();
};

export default handleThemedModalClose;
