import adjustHexColor from './adjustHexColor.js';
import computeContrastRatio from './computeContrastRatio.js';
import getPaletteMoodRecords from './getPaletteMoodRecords.js';
import pickReadableTextColor from './pickReadableTextColor.js';

const generateBrandPalette = (brandHex, moodId) => {
  const moodRecords = getPaletteMoodRecords();
  const moodRecord = moodRecords.filter((record) => record.moodId === moodId)[0] || moodRecords[0];
  const isDarkMood = moodRecord.moodId === 'night';
  let brandColor = adjustHexColor(brandHex, {});
  let attempts = 0;
  while (computeContrastRatio(brandColor, moodRecord.surface) < 3 && attempts < 8) {
    brandColor = adjustHexColor(brandColor, { lightnessShift: isDarkMood ? 0.06 : -0.06 });
    attempts += 1;
  }
  const accentColor = adjustHexColor(brandColor, { hueShift: moodRecord.accentHueShift, saturationShift: 0.05 });
  return {
    brand: brandColor,
    brandContrast: pickReadableTextColor(brandColor, '#111111', '#ffffff'),
    accent: accentColor,
    surface: moodRecord.surface,
    surfaceAlt: moodRecord.surfaceAlt,
    text: moodRecord.text,
    textMuted: moodRecord.textMuted,
    line: moodRecord.line,
    focusRing: adjustHexColor(brandColor, { lightnessShift: isDarkMood ? 0.18 : 0.12 }),
    success: '#1f8a4c',
    warning: '#b7791f',
    danger: '#c53030',
  };
};

export default generateBrandPalette;
