import findDescendantByAttribute from './findDescendantByAttribute.js';
import formatStatNumber from './formatStatNumber.js';
import resolveComponentSiteLocale from './resolveComponentSiteLocale.js';

const syncStatValueFromAttributes = (component) => {
  if (!component || !component.getAttributes) return;
  const attributeRecord = component.getAttributes();
  if (attributeRecord['data-db-stat-target'] === undefined) return;
  const valueComponent = findDescendantByAttribute(component, 'data-db-stat-value') || component;
  const numberText = formatStatNumber(attributeRecord['data-db-stat-target'], resolveComponentSiteLocale(component));
  const prefixText = String(attributeRecord['data-db-stat-prefix'] || '');
  const suffixText = String(attributeRecord['data-db-stat-suffix'] || '');
  valueComponent.components(prefixText + numberText + suffixText);
};

export default syncStatValueFromAttributes;
