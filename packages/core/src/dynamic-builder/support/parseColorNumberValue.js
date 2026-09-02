const parseColorNumberValue = (rawValue, fullScaleValue) => {
  const trimmedValue = String(rawValue == null ? '' : rawValue).trim();
  if (!trimmedValue) return null;
  if (trimmedValue.slice(-1) === '%') {
    const percentValue = Number(trimmedValue.slice(0, -1));
    return Number.isFinite(percentValue) ? (percentValue / 100) * fullScaleValue : null;
  }
  const numberValue = Number(trimmedValue);
  return Number.isFinite(numberValue) ? numberValue : null;
};

export default parseColorNumberValue;
