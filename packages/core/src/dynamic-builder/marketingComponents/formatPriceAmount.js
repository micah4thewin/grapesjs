const formatPriceAmount = (amountValue, currencyCode, localeCode) => {
  const safeAmount = Number(amountValue);
  if (!isFinite(safeAmount)) return '';
  const fractionDigits = Number.isInteger(safeAmount) ? 0 : 2;
  const upperCurrency = String(currencyCode || '').toUpperCase();
  const safeCurrency = /^[A-Z]{3}$/.test(upperCurrency) ? upperCurrency : 'USD';
  try {
    return new Intl.NumberFormat(localeCode || undefined, {
      style: 'currency',
      currency: safeCurrency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(safeAmount);
  } catch (formatError) {
    return safeCurrency + ' ' + safeAmount.toFixed(fractionDigits);
  }
};

export default formatPriceAmount;
