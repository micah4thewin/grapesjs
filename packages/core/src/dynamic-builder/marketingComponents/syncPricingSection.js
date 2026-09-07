import escapeHtmlText from '../support/escapeHtmlText.js';
import findDescendantByAttribute from './findDescendantByAttribute.js';
import findDescendantsByAttribute from './findDescendantsByAttribute.js';
import resolvePricingSettings from './resolvePricingSettings.js';
import syncPricingTierDisplay from './syncPricingTierDisplay.js';

const syncPricingSection = (pricingComponent) => {
  if (!pricingComponent || !pricingComponent.getAttributes) return;
  const settings = resolvePricingSettings(pricingComponent);
  findDescendantsByAttribute(pricingComponent, 'data-db-amount').forEach((tierComponent) =>
    syncPricingTierDisplay(tierComponent),
  );
  findDescendantsByAttribute(pricingComponent, 'data-db-billing').forEach((toggleComponent) => {
    const isPressed = toggleComponent.getAttributes()['data-db-billing'] === settings.activePeriod;
    toggleComponent.addAttributes({ 'aria-pressed': isPressed ? 'true' : 'false' });
  });
  const saveComponent = findDescendantByAttribute(pricingComponent, 'data-db-pricing-save');
  if (!saveComponent) return;
  const saveText =
    settings.discountPercent > 0 ? settings.saveLabel.split('{percent}').join(String(settings.discountPercent)) : '';
  saveComponent.components(escapeHtmlText(saveText));
};

export default syncPricingSection;
