import escapeHtmlText from '../support/escapeHtmlText.js';
import findDescendantWithAttribute from './findDescendantWithAttribute.js';

const syncFacadeTextChild = (facadeComponent, attributeName, childMarkerAttribute) => {
  const textComponent = findDescendantWithAttribute(facadeComponent, childMarkerAttribute);
  if (!textComponent || !textComponent.components) return false;
  textComponent.components(escapeHtmlText(String(facadeComponent.getAttributes()[attributeName] || '')));
  return true;
};

export default syncFacadeTextChild;
