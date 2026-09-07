import buildPricingFeatureRowRecord from './buildPricingFeatureRowRecord.js';
import findDescendantByAttribute from './findDescendantByAttribute.js';

const appendPricingFeatureRow = (editor, tierComponent) => {
  const listComponent = findDescendantByAttribute(tierComponent, 'data-db-pricing-features');
  if (!listComponent) return;
  const addedRow = listComponent.append(buildPricingFeatureRowRecord('Describe a benefit'))[0];
  if (addedRow && editor && editor.select) editor.select(addedRow);
};

export default appendPricingFeatureRow;
