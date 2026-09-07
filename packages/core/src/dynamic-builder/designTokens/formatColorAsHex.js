import formatHexColor from '../siteIdentity/formatHexColor.js';
import parseColorToRgb from '../support/parseColorToRgb.js';

const formatColorAsHex = (colorValue, fallbackHex) => {
  const rgbRecord = parseColorToRgb(colorValue);
  return rgbRecord ? formatHexColor(rgbRecord) : fallbackHex || '#000000';
};

export default formatColorAsHex;
