import resolveComponentSiteLocale from './resolveComponentSiteLocale.js';

const resolvePricingSettings = (pricingComponent) => {
  const attributeRecord = pricingComponent && pricingComponent.getAttributes ? pricingComponent.getAttributes() : {};
  const readText = (attributeName, fallbackText) =>
    attributeRecord[attributeName] === undefined ? fallbackText : String(attributeRecord[attributeName]);
  const discountValue = Number(attributeRecord['data-db-yearly-discount']);
  return {
    currencyCode: readText('data-db-currency', 'USD'),
    discountPercent: isFinite(discountValue) ? Math.min(100, Math.max(0, discountValue)) : 0,
    activePeriod: attributeRecord['data-db-billing-default'] === 'yearly' ? 'yearly' : 'monthly',
    monthlySuffix: readText('data-db-period-monthly', '/month'),
    yearlySuffix: readText('data-db-period-yearly', '/year'),
    saveLabel: readText('data-db-save-label', 'Save {percent}%'),
    localeCode: resolveComponentSiteLocale(pricingComponent),
  };
};

export default resolvePricingSettings;
