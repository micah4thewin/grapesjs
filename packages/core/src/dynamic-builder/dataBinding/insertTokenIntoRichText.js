import escapeHtmlText from '../support/escapeHtmlText.js';

const insertTokenIntoRichText = (richTextEditor, savedRange, tokenText) => {
  const editableElement = richTextEditor && richTextEditor.el;
  const ownerDocument = richTextEditor && richTextEditor.doc;
  if (!editableElement || !ownerDocument) return false;
  editableElement.focus();
  const selection = ownerDocument.getSelection ? ownerDocument.getSelection() : null;
  if (selection && savedRange) {
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }
  if (typeof richTextEditor.insertHTML === 'function') {
    richTextEditor.insertHTML(escapeHtmlText(tokenText));
    return true;
  }
  if (selection && selection.rangeCount) {
    const insertRange = selection.getRangeAt(0);
    insertRange.deleteContents();
    insertRange.insertNode(ownerDocument.createTextNode(tokenText));
    return true;
  }
  return false;
};

export default insertTokenIntoRichText;
