import getSeoLanguageOptions from './getSeoLanguageOptions.js';

const findSeoLanguageOption = (languageCode) => {
  const loweredCode = String(languageCode || '')
    .trim()
    .toLowerCase();
  if (!loweredCode) return null;
  return getSeoLanguageOptions().find((languageOption) => languageOption.code.toLowerCase() === loweredCode) || null;
};

export default findSeoLanguageOption;
