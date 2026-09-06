import computeRelativeLuminance from './computeRelativeLuminance.js';
import parseHexColor from './parseHexColor.js';

const computeContrastRatio = (firstHex, secondHex) => {
  const firstRgb = parseHexColor(firstHex);
  const secondRgb = parseHexColor(secondHex);
  if (!firstRgb || !secondRgb) return 1;
  const firstLuminance = computeRelativeLuminance(firstRgb);
  const secondLuminance = computeRelativeLuminance(secondRgb);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
};

export default computeContrastRatio;
