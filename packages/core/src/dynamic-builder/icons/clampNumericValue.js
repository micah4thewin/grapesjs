const clampNumericValue = (rawValue, minValue, maxValue, fallbackValue) => {
  const parsedValue = parseFloat(rawValue);
  if (Number.isNaN(parsedValue)) return fallbackValue;
  return Math.min(maxValue, Math.max(minValue, parsedValue));
};

export default clampNumericValue;
