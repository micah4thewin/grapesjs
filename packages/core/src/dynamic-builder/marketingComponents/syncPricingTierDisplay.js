import escapeHtmlText from '../support/escapeHtmlText.js';
import computeYearlyAmount from './computeYearlyAmount.js';
import findClosestComponentOfType from './findClosestComponentOfType.js';
import findDescendantByAttribute from './findDescendantByAttribute.js';
import formatPriceAmount from './formatPriceAmount.js';
import readComponentPlainText from './readComponentPlainText.js';
import resolvePricingSettings from './resolvePricingSettings.js';

const syncPricingTierDisplay = (tierComponent) => {
  if (!tierComponent || !tierComponent.getAttributes) return;
  const amountText = tierComponent.getAttributes()['data-db-amount'];
  if (amountText === undefined) return;
  const settings = resolvePricingSettings(findClosestComponentOfType(tierComponent.parent(), 'db-pricing'));
  const monthlyText = formatPriceAmount(amountText, settings.currencyCode, settings.localeCode);
  const yearlyAmount = computeYearlyAmount(amountText, settings.discountPercent);
  const yearlyText = formatPriceAmount(yearlyAmount, settings.currencyCode, settings.localeCode);
  const priceComponent = findDescendantByAttribute(tierComponent, 'data-db-price-monthly');
  if (!priceComponent || !monthlyText) return;
  priceComponent.addAttributes({
    'data-db-price-monthly': monthlyText,
    'data-db-price-yearly': yearlyText,
    'data-db-period-monthly': settings.monthlySuffix,
    'data-db-period-yearly': settings.yearlySuffix,
  });
  const showsYearly = settings.activePeriod === 'yearly';
  const valueComponent = findDescendantByAttribute(priceComponent, 'data-db-price-value');
  const periodComponent = findDescendantByAttribute(priceComponent, 'data-db-price-period');
  const writeText = (targetComponent, nextText) => {
    if (targetComponent && readComponentPlainText(targetComponent) !== nextText) {
      targetComponent.components(escapeHtmlText(nextText));
    }
  };
  writeText(valueComponent, showsYearly ? yearlyText : monthlyText);
  writeText(periodComponent, showsYearly ? settings.yearlySuffix : settings.monthlySuffix);
};

export default syncPricingTierDisplay;
