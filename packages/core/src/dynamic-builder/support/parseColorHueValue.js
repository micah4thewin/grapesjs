const parseColorHueValue = (rawValue) => {
  const trimmedValue = String(rawValue == null ? '' : rawValue)
    .trim()
    .toLowerCase();
  if (!trimmedValue) return null;
  const unitMatch = trimmedValue.match(/^(-?[\d.]+)(deg|grad|rad|turn)?$/);
  if (!unitMatch) return null;
  const numberValue = Number(unitMatch[1]);
  if (!Number.isFinite(numberValue)) return null;
  const unitName = unitMatch[2] || 'deg';
  if (unitName === 'turn') return numberValue * 360;
  if (unitName === 'rad') return (numberValue * 180) / Math.PI;
  if (unitName === 'grad') return numberValue * 0.9;
  return numberValue;
};

export default parseColorHueValue;
