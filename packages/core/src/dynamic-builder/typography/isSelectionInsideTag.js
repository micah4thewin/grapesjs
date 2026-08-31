const isSelectionInsideTag = (richTextEditor, tagName) => {
  const currentSelection = richTextEditor && richTextEditor.selection && richTextEditor.selection();
  if (!currentSelection) return false;
  const candidateNodes = [currentSelection.anchorNode, currentSelection.focusNode];
  return candidateNodes.some((candidateNode) => {
    let currentNode = candidateNode;
    while (currentNode) {
      if (currentNode.nodeName === tagName) return true;
      if (currentNode === richTextEditor.el) return false;
      currentNode = currentNode.parentNode;
    }
    return false;
  });
};

export default isSelectionInsideTag;
