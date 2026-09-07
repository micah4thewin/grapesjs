import findDescendantsByAttribute from './findDescendantsByAttribute.js';

const findDescendantByAttribute = (rootComponent, attributeName) =>
  findDescendantsByAttribute(rootComponent, attributeName)[0] || null;

export default findDescendantByAttribute;
