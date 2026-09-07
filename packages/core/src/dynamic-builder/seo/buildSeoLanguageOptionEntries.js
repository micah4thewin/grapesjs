import findSeoLanguageOption from './findSeoLanguageOption.js';
import getSeoLanguageOptions from './getSeoLanguageOptions.js';
import normalizeLanguageCode from './normalizeLanguageCode.js';

const buildSeoLanguageOptionEntries = (currentCode) => {
  const optionEntries = [['', 'Choose a language']].concat(
    getSeoLanguageOptions().map((languageOption) => [languageOption.code, languageOption.label]),
  );
  const normalizedCode = normalizeLanguageCode(currentCode);
  if (normalizedCode && !findSeoLanguageOption(normalizedCode)) {
    optionEntries.push([normalizedCode, normalizedCode + ' (custom code)']);
  }
  return optionEntries;
};

export default buildSeoLanguageOptionEntries;
