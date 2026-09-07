import buildPricingTierRecord from './buildPricingTierRecord.js';
import findDescendantByAttribute from './findDescendantByAttribute.js';
import getPricingTierPresetRecords from './getPricingTierPresetRecords.js';
import syncPricingTierDisplay from './syncPricingTierDisplay.js';

const appendPricingTier = (editor, pricingComponent) => {
  const gridComponent = findDescendantByAttribute(pricingComponent, 'data-db-pricing-grid');
  if (!gridComponent) return;
  const presetRecords = getPricingTierPresetRecords();
  const presetIndex = gridComponent.components().length % presetRecords.length;
  const addedTier = gridComponent.append(
    buildPricingTierRecord({ ...presetRecords[presetIndex], featured: 'false' }),
  )[0];
  if (!addedTier) return;
  syncPricingTierDisplay(addedTier);
  if (editor && editor.select) editor.select(addedTier);
};

export default appendPricingTier;
