import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import syncTextComponentContent from './syncTextComponentContent.js';

const syncLegendFromAttribute = (component, fallbackText) => {
  if (!component || !component.getAttributes) return;
  const legendComponent = findDescendantByAttributeName(component, 'data-db-radio-legend');
  syncTextComponentContent(legendComponent, component.getAttributes()['data-db-legend'] || fallbackText);
};

export default syncLegendFromAttribute;
