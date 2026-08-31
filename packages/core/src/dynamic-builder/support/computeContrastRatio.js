import computeRelativeLuminance from './computeRelativeLuminance.js';
import parseColorToRgb from './parseColorToRgb.js';

const computeContrastRatio = (firstColorValue, secondColorValue) => {
  const firstColor = parseColorToRgb(firstColorValue);
  const secondColor = parseColorToRgb(secondColorValue);
  if (!firstColor || !secondColor) return null;
  const firstLuminance = computeRelativeLuminance(firstColor);
  const secondLuminance = computeRelativeLuminance(secondColor);
  const lighterLuminance = Math.max(firstLuminance, secondLuminance);
  const darkerLuminance = Math.min(firstLuminance, secondLuminance);
  return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
};

export default computeContrastRatio;
