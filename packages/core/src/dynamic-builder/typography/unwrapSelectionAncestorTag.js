const unwrapSelectionAncestorTag = (richTextEditor, tagName) => {
  const currentSelection = richTextEditor && richTextEditor.selection && richTextEditor.selection();
  const startNode = currentSelection && (currentSelection.anchorNode || currentSelection.focusNode);
  let wrapperNode = startNode;
  while (wrapperNode && wrapperNode.nodeName !== tagName) {
    if (wrapperNode === richTextEditor.el) return false;
    wrapperNode = wrapperNode.parentNode;
  }
  if (!wrapperNode || !wrapperNode.parentNode) return false;
  const parentNode = wrapperNode.parentNode;
  while (wrapperNode.firstChild) parentNode.insertBefore(wrapperNode.firstChild, wrapperNode);
  parentNode.removeChild(wrapperNode);
  parentNode.normalize();
  return true;
};

export default unwrapSelectionAncestorTag;
