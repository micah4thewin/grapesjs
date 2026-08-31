import findDescendantByAttribute from './findDescendantByAttribute.js';

const syncPriceDisplayFromAttributes = (component) => {
  if (!component || !component.getAttributes) return;
  const componentAttributes = component.getAttributes();
  const monthlyPrice = componentAttributes['data-db-price-monthly'];
  if (monthlyPrice === undefined) return;
  const priceValueComponent = findDescendantByAttribute(component, 'data-db-price-value');
  if (priceValueComponent) priceValueComponent.components(String(monthlyPrice));
};

export default syncPriceDisplayFromAttributes;
