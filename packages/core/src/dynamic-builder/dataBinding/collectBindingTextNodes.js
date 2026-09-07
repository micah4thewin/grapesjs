const skippedParentTags = ['SCRIPT', 'STYLE', 'TEMPLATE'];

const collectBindingTextNodes = (rootElement) => {
  const textEntries = [];
  const ownerDocument = rootElement && rootElement.ownerDocument;
  if (!ownerDocument || !ownerDocument.createTreeWalker) return textEntries;
  const treeWalker = ownerDocument.createTreeWalker(rootElement, 4);
  let currentNode = treeWalker.nextNode();
  while (currentNode) {
    const parentElement = currentNode.parentNode;
    const parentTag = parentElement && parentElement.tagName ? String(parentElement.tagName).toUpperCase() : '';
    if (skippedParentTags.indexOf(parentTag) < 0) {
      const currentText = String(currentNode.nodeValue || '');
      const rawText =
        currentText.indexOf('{{') >= 0 || currentNode.dbRawText === undefined ? currentText : currentNode.dbRawText;
      if (rawText.indexOf('{{') >= 0) textEntries.push({ textNode: currentNode, rawText });
    }
    currentNode = treeWalker.nextNode();
  }
  return textEntries;
};

export default collectBindingTextNodes;
