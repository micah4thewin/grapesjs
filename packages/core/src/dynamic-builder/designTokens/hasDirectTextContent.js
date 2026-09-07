const hasDirectTextContent = (element) =>
  Array.from(element.childNodes || []).some(
    (childNode) => childNode.nodeType === 3 && /\S/.test(childNode.nodeValue || ''),
  );

export default hasDirectTextContent;
