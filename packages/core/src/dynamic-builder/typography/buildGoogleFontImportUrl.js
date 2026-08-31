import normalizeFontWeightList from './normalizeFontWeightList.js';
import sanitizeFontFamilyName from './sanitizeFontFamilyName.js';

const buildGoogleFontImportUrl = (fontEntries) => {
  const familyParams = (Array.isArray(fontEntries) ? fontEntries : [])
    .map((fontEntry) => {
      const familyName = sanitizeFontFamilyName(fontEntry && fontEntry.family);
      if (!familyName) return '';
      const weightList = normalizeFontWeightList(fontEntry.weights);
      const encodedFamily = familyName.replace(/ /g, '+');
      const weightSuffix = weightList.length ? `:wght@${weightList.join(';')}` : '';
      return `family=${encodedFamily}${weightSuffix}`;
    })
    .filter(Boolean);
  if (!familyParams.length) return '';
  return `https://fonts.googleapis.com/css2?${familyParams.join('&')}&display=swap`;
};

export default buildGoogleFontImportUrl;
