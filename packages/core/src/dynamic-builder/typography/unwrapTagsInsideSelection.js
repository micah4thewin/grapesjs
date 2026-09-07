import unwrapElementNode from './unwrapElementNode.js';
import unwrapSelectionAncestorTag from './unwrapSelectionAncestorTag.js';

const unwrapTagsInsideSelection = (richTextEditor, tagName) => {
  let unwrappedCount = unwrapSelectionAncestorTag(richTextEditor, tagName) ? 1 : 0;
  const currentSelection = richTextEditor && richTextEditor.selection && richTextEditor.selection();
  const rootElement = richTextEditor && richTextEditor.el;
  if (!currentSelection || !currentSelection.rangeCount || !rootElement || !rootElement.querySelectorAll) {
    return unwrappedCount;
  }
  const selectionRange = currentSelection.getRangeAt(0);
  Array.from(rootElement.querySelectorAll(tagName.toLowerCase()))
    .filter((candidateNode) => selectionRange.intersectsNode(candidateNode))
    .forEach((candidateNode) => {
      unwrappedCount += unwrapElementNode(candidateNode) ? 1 : 0;
    });
  return unwrappedCount;
};

export default unwrapTagsInsideSelection;
