const parseWholeNumberValue = (rawValue, fallbackValue) => {
  const parsedValue = parseInt(String(rawValue == null ? '' : rawValue), 10);
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : fallbackValue;
};

export default parseWholeNumberValue;
