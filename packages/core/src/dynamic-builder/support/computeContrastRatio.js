import compositeColorOver from './compositeColorOver.js';
import computeRelativeLuminance from './computeRelativeLuminance.js';
import parseColorToRgb from './parseColorToRgb.js';

const computeContrastRatio = (foregroundValue, backgroundValue) => {
  const backgroundColor = parseColorToRgb(backgroundValue);
  const foregroundColor = parseColorToRgb(foregroundValue);
  if (!foregroundColor || !backgroundColor) return null;
  const solidBackground = compositeColorOver(backgroundColor, { red: 255, green: 255, blue: 255, alpha: 1 });
  const solidForeground = compositeColorOver(foregroundColor, solidBackground);
  const foregroundLuminance = computeRelativeLuminance(solidForeground);
  const backgroundLuminance = computeRelativeLuminance(solidBackground);
  const lighterLuminance = Math.max(foregroundLuminance, backgroundLuminance);
  const darkerLuminance = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
};

export default computeContrastRatio;
