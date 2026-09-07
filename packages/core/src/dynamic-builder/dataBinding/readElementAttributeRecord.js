const readElementAttributeRecord = (element) => {
  const attributesRecord = {};
  if (!element || !element.attributes) return attributesRecord;
  Array.from(element.attributes).forEach((attributeNode) => {
    attributesRecord[attributeNode.name] = attributeNode.value;
  });
  return attributesRecord;
};

export default readElementAttributeRecord;
