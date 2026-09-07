import unwrapElementNode from './unwrapElementNode.js';

const unwrapSelectionAncestorTag = (richTextEditor, tagName) => {
  const currentSelection = richTextEditor && richTextEditor.selection && richTextEditor.selection();
  const startNode = currentSelection && (currentSelection.anchorNode || currentSelection.focusNode);
  let wrapperNode = startNode;
  while (wrapperNode && wrapperNode.nodeName !== tagName) {
    if (wrapperNode === richTextEditor.el) return false;
    wrapperNode = wrapperNode.parentNode;
  }
  if (!wrapperNode) return false;
  return unwrapElementNode(wrapperNode);
};

export default unwrapSelectionAncestorTag;
