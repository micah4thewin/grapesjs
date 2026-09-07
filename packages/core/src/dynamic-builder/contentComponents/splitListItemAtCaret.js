import activateTextEditing from '../support/activateTextEditing.js';
import addListItemAfter from './addListItemAfter.js';

const splitListItemAtCaret = async (editor, listItem) => {
  const itemElement = listItem.getEl && listItem.getEl();
  const ownerDocument = itemElement && itemElement.ownerDocument;
  const selection = ownerDocument && ownerDocument.getSelection();
  if (!selection || !selection.rangeCount) return null;
  const caretRange = selection.getRangeAt(0);
  caretRange.deleteContents();
  const tailRange = ownerDocument.createRange();
  tailRange.setStart(caretRange.endContainer, caretRange.endOffset);
  tailRange.setEnd(itemElement, itemElement.childNodes.length);
  const tailHolder = ownerDocument.createElement('div');
  tailHolder.appendChild(tailRange.extractContents());
  const tailHtml = tailHolder.innerHTML.replace(/^(<br\s*\/?>)+/i, '');
  const itemView = listItem.getView && listItem.getView();
  if (itemView && itemView.disableEditing) await itemView.disableEditing();
  const addedItem = addListItemAfter(listItem, tailHtml);
  if (addedItem) await activateTextEditing(editor, addedItem, 'start');
  return addedItem;
};

export default splitListItemAtCaret;
