const formatStatNumber = (targetText, localeCode) => {
  const rawText = String(targetText === undefined || targetText === null ? '' : targetText).trim();
  const parsedValue = parseFloat(rawText);
  const safeValue = isNaN(parsedValue) ? 0 : parsedValue;
  const decimalPart = rawText.split('.')[1] || '';
  const decimalCount = Math.min(3, decimalPart.replace(/[^0-9]/g, '').length);
  try {
    return safeValue.toLocaleString(localeCode || undefined, {
      minimumFractionDigits: decimalCount,
      maximumFractionDigits: decimalCount,
    });
  } catch (formatError) {
    return safeValue.toFixed(decimalCount);
  }
};

export default formatStatNumber;
