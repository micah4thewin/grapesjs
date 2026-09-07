import trimCanonicalBaseUrl from '../seo/trimCanonicalBaseUrl.js';

const languageCodePattern = /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/;

const validateSiteSettingsValues = (settingsValues) => {
  const valuesRecord = settingsValues || {};
  const fieldErrors = {};
  const canonicalBase = String(valuesRecord.canonicalBase || '').trim();
  if (canonicalBase && !trimCanonicalBaseUrl(canonicalBase)) {
    fieldErrors.canonicalBase =
      'Enter the full web address, starting with https://, for example https://www.example.com';
  }
  const languageCode = String(valuesRecord.language || '').trim();
  if (languageCode && !languageCodePattern.test(languageCode)) {
    fieldErrors.language = 'Use a short language code such as en, en-US or de';
  }
  return { isValid: Object.keys(fieldErrors).length === 0, errors: fieldErrors };
};

export default validateSiteSettingsValues;
