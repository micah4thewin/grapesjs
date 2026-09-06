import computeContrastRatio from './computeContrastRatio.js';

const pickReadableTextColor = (backgroundHex, darkHex, lightHex) =>
  computeContrastRatio(backgroundHex, darkHex || '#111111') >=
  computeContrastRatio(backgroundHex, lightHex || '#ffffff')
    ? darkHex || '#111111'
    : lightHex || '#ffffff';

export default pickReadableTextColor;
