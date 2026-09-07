const unwrapElementNode = (elementNode) => {
  const parentNode = elementNode && elementNode.parentNode;
  if (!parentNode) return false;
  while (elementNode.firstChild) parentNode.insertBefore(elementNode.firstChild, elementNode);
  parentNode.removeChild(elementNode);
  parentNode.normalize();
  return true;
};

export default unwrapElementNode;
