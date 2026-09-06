import convertHslToRgb from './convertHslToRgb.js';
import convertRgbToHsl from './convertRgbToHsl.js';
import formatHexColor from './formatHexColor.js';
import parseHexColor from './parseHexColor.js';

const adjustHexColor = (hexValue, adjustments) => {
  const rgbRecord = parseHexColor(hexValue);
  if (!rgbRecord) return '#000000';
  const hslRecord = convertRgbToHsl(rgbRecord);
  return formatHexColor(
    convertHslToRgb({
      hue: hslRecord.hue + (adjustments.hueShift || 0),
      saturation:
        adjustments.saturation !== undefined
          ? adjustments.saturation
          : hslRecord.saturation + (adjustments.saturationShift || 0),
      lightness:
        adjustments.lightness !== undefined
          ? adjustments.lightness
          : hslRecord.lightness + (adjustments.lightnessShift || 0),
    }),
  );
};

export default adjustHexColor;
