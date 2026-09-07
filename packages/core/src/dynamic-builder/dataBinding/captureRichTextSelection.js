const captureRichTextSelection = (richTextEditor) => {
  const ownerDocument = richTextEditor && richTextEditor.doc;
  const selection = ownerDocument && ownerDocument.getSelection ? ownerDocument.getSelection() : null;
  if (!selection || !selection.rangeCount) return null;
  const currentRange = selection.getRangeAt(0);
  const editableElement = richTextEditor.el;
  if (editableElement && !editableElement.contains(currentRange.commonAncestorContainer)) return null;
  return currentRange.cloneRange();
};

export default captureRichTextSelection;
