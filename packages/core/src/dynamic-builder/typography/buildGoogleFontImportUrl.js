import normalizeFontWeightList from './normalizeFontWeightList.js';
import sanitizeFontFamilyName from './sanitizeFontFamilyName.js';

const buildAxisSuffix = (weightList, includeItalic) => {
  if (!includeItalic) return weightList.length ? `:wght@${weightList.join(';')}` : '';
  const safeWeights = weightList.length ? weightList : [400];
  const uprightTuples = safeWeights.map((weightValue) => `0,${weightValue}`);
  const italicTuples = safeWeights.map((weightValue) => `1,${weightValue}`);
  return `:ital,wght@${[...uprightTuples, ...italicTuples].join(';')}`;
};

const buildGoogleFontImportUrl = (fontEntries) => {
  const familyParams = (Array.isArray(fontEntries) ? fontEntries : [])
    .map((fontEntry) => {
      const familyName = sanitizeFontFamilyName(fontEntry && fontEntry.family);
      if (!familyName) return '';
      const weightList = normalizeFontWeightList(fontEntry.weights);
      const encodedFamily = familyName.replace(/ /g, '+');
      return `family=${encodedFamily}${buildAxisSuffix(weightList, Boolean(fontEntry.italic))}`;
    })
    .filter(Boolean);
  if (!familyParams.length) return '';
  return `https://fonts.googleapis.com/css2?${familyParams.join('&')}&display=swap`;
};

export default buildGoogleFontImportUrl;
