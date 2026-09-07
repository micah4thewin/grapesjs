import findSeoLanguageOption from './findSeoLanguageOption.js';
import isValidLanguageCode from './isValidLanguageCode.js';
import normalizeLanguageCode from './normalizeLanguageCode.js';

const resolveOpenGraphLocale = (languageCode) => {
  const normalizedCode = normalizeLanguageCode(languageCode);
  if (!isValidLanguageCode(normalizedCode)) return '';
  const knownOption = findSeoLanguageOption(normalizedCode);
  if (knownOption) return knownOption.ogLocale;
  const codeParts = normalizedCode.split('-');
  const regionPart = codeParts[codeParts.length - 1];
  if (codeParts.length < 2 || !/^[A-Z]{2}$/.test(regionPart)) return '';
  return codeParts[0] + '_' + regionPart;
};

export default resolveOpenGraphLocale;
