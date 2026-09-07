const replaceTextNodeWithMarkup = (textNode, markupText) => {
  const ownerDocument = textNode && textNode.ownerDocument;
  const parentNode = textNode && textNode.parentNode;
  if (!ownerDocument || !parentNode) return;
  const templateElement = ownerDocument.createElement('template');
  templateElement.innerHTML = String(markupText || '');
  parentNode.replaceChild(templateElement.content, textNode);
};

export default replaceTextNodeWithMarkup;
