import parseColorToRgb from '../support/parseColorToRgb.js';

const applyIconColorStyle = (iconComponent, colorValue) => {
  if (!iconComponent || typeof iconComponent.getStyle !== 'function') return false;
  const currentStyle = { ...iconComponent.getStyle() };
  const safeColor = colorValue && parseColorToRgb(colorValue) ? colorValue : '';
  if (currentStyle.color === safeColor || (!safeColor && !currentStyle.color)) return false;
  if (safeColor) currentStyle.color = safeColor;
  else delete currentStyle.color;
  iconComponent.setStyle(currentStyle);
  return true;
};

export default applyIconColorStyle;
