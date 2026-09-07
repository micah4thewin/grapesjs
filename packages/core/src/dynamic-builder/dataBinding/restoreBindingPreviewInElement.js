const restoreBindingPreviewInElement = (rootElement) => {
  const ownerDocument = rootElement && rootElement.ownerDocument;
  if (!ownerDocument || !ownerDocument.createTreeWalker) return;
  const treeWalker = ownerDocument.createTreeWalker(rootElement, 4);
  let currentNode = treeWalker.nextNode();
  while (currentNode) {
    if (currentNode.dbRawText !== undefined) {
      currentNode.nodeValue = currentNode.dbRawText;
      delete currentNode.dbRawText;
    }
    currentNode = treeWalker.nextNode();
  }
  [rootElement, ...Array.from(rootElement.querySelectorAll('*'))].forEach((currentElement) => {
    const storedRecord = currentElement.dbRawAttributes;
    if (storedRecord) {
      Object.keys(storedRecord).forEach((attributeName) =>
        currentElement.setAttribute(attributeName, storedRecord[attributeName]),
      );
      delete currentElement.dbRawAttributes;
    }
    if (currentElement.dbBoundTitle) {
      currentElement.removeAttribute('title');
      delete currentElement.dbBoundTitle;
    }
    currentElement.removeAttribute('data-db-bound-preview');
    currentElement.removeAttribute('data-db-condition-state');
  });
};

export default restoreBindingPreviewInElement;
