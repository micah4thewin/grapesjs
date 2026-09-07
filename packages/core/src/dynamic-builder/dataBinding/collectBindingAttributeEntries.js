const collectBindingAttributeEntries = (rootElement) => {
  const attributeEntries = [];
  if (!rootElement || !rootElement.querySelectorAll) return attributeEntries;
  const candidateElements = [rootElement, ...Array.from(rootElement.querySelectorAll('*'))];
  candidateElements.forEach((candidateElement) => {
    const storedRecord = candidateElement.dbRawAttributes || {};
    const seenNames = new Set();
    Array.from(candidateElement.attributes || []).forEach((attributeNode) => {
      seenNames.add(attributeNode.name);
      const currentValue = String(attributeNode.value || '');
      const storedValue = storedRecord[attributeNode.name];
      const rawValue = currentValue.indexOf('{{') >= 0 || storedValue === undefined ? currentValue : storedValue;
      if (rawValue.indexOf('{{') >= 0) {
        attributeEntries.push({ element: candidateElement, attributeName: attributeNode.name, rawValue });
      }
    });
    Object.keys(storedRecord).forEach((storedName) => {
      if (seenNames.has(storedName) || String(storedRecord[storedName]).indexOf('{{') < 0) return;
      attributeEntries.push({
        element: candidateElement,
        attributeName: storedName,
        rawValue: storedRecord[storedName],
      });
    });
  });
  return attributeEntries;
};

export default collectBindingAttributeEntries;
