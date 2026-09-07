const normalizeSchemaPriceValue = (candidateValue) => {
  const compactValue = String(candidateValue == null ? '' : candidateValue)
    .replace(/[^\d.,-]/g, '')
    .replace(/,(?=\d{3}(\D|$))/g, '')
    .replace(/,/g, '.')
    .trim();
  if (!compactValue) return '';
  const numericValue = Number(compactValue);
  if (!Number.isFinite(numericValue) || numericValue < 0) return '';
  return String(Math.round(numericValue * 100) / 100);
};

export default normalizeSchemaPriceValue;
