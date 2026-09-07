import removeEmptyListItem from './removeEmptyListItem.js';
import resolveEditingListItem from './resolveEditingListItem.js';
import splitListItemAtCaret from './splitListItemAtCaret.js';

const isElementTextEmpty = (element) => !element || !String(element.textContent || '').trim();

const wireListItemEditing = (editor) => {
  const wiredDocuments = new WeakSet();
  const handleKeydown = (keyboardEvent) => {
    if (keyboardEvent.defaultPrevented || keyboardEvent.isComposing) return;
    const isEnter = keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey;
    const isBackspace = keyboardEvent.key === 'Backspace';
    if (!isEnter && !isBackspace) return;
    const listItem = resolveEditingListItem(editor);
    if (!listItem) return;
    if (isBackspace && !isElementTextEmpty(listItem.getEl())) return;
    keyboardEvent.preventDefault();
    keyboardEvent.stopImmediatePropagation();
    if (isEnter) splitListItemAtCaret(editor, listItem);
    else removeEmptyListItem(editor, listItem);
  };
  const attachToCanvas = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument || wiredDocuments.has(canvasDocument)) return;
    wiredDocuments.add(canvasDocument);
    canvasDocument.addEventListener('keydown', handleKeydown, true);
  };
  editor.on('canvas:frame:load:body', attachToCanvas);
  editor.on('rte:enable', attachToCanvas);
  if (editor.onReady) editor.onReady(attachToCanvas);
};

export default wireListItemEditing;
