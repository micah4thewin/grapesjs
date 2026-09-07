const wrapSelectionWithTag = (richTextEditor, tagName) => {
  const currentSelection = richTextEditor && richTextEditor.selection && richTextEditor.selection();
  if (!currentSelection || !currentSelection.rangeCount || currentSelection.isCollapsed) return false;
  const selectionRange = currentSelection.getRangeAt(0);
  const ownerDocument = richTextEditor.doc || (richTextEditor.el && richTextEditor.el.ownerDocument);
  if (!ownerDocument) return false;
  const wrapperElement = ownerDocument.createElement(tagName);
  wrapperElement.appendChild(selectionRange.extractContents());
  selectionRange.insertNode(wrapperElement);
  const nextRange = ownerDocument.createRange();
  nextRange.selectNodeContents(wrapperElement);
  currentSelection.removeAllRanges();
  currentSelection.addRange(nextRange);
  richTextEditor.updateActiveActions && richTextEditor.updateActiveActions();
  return true;
};

export default wrapSelectionWithTag;
