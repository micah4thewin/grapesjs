import isValidLanguageCode from './isValidLanguageCode.js';

const normalizeLanguageCode = (languageCode) => {
  const trimmedCode = String(languageCode || '').trim();
  if (!isValidLanguageCode(trimmedCode)) return trimmedCode;
  return trimmedCode
    .split('-')
    .map((codePart, partIndex) => {
      if (partIndex === 0) return codePart.toLowerCase();
      return /^[A-Za-z]{2}$/.test(codePart) ? codePart.toUpperCase() : codePart;
    })
    .join('-');
};

export default normalizeLanguageCode;
