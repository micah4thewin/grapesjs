import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';
import validateSiteSettingsValues from './validateSiteSettingsValues.js';

const saveSiteSettingsRecord = (editor, rootElement) => {
  const seoPatch = {};
  const inputElements = {};
  ['siteName', 'canonicalBase', 'language'].forEach((fieldKey) => {
    const inputElement = rootElement.querySelector('[data-db-site-field="' + fieldKey + '"]');
    if (!inputElement) return;
    inputElements[fieldKey] = inputElement;
    seoPatch[fieldKey] = String(inputElement.value || '').trim();
  });
  const validationResult = validateSiteSettingsValues(seoPatch);
  let firstInvalidElement = null;
  Object.keys(inputElements).forEach((fieldKey) => {
    const inputElement = inputElements[fieldKey];
    const errorElement = rootElement.querySelector('[data-db-site-error="' + fieldKey + '"]');
    const errorText = validationResult.errors[fieldKey] || '';
    if (errorElement) errorElement.textContent = errorText;
    inputElement.classList.toggle('gjs-db-field-invalid', !!errorText);
    if (errorText) inputElement.setAttribute('aria-invalid', 'true');
    else inputElement.removeAttribute('aria-invalid');
    if (errorText && !firstInvalidElement) firstInvalidElement = inputElement;
  });
  if (!validationResult.isValid) {
    if (firstInvalidElement && typeof firstInvalidElement.focus === 'function') firstInvalidElement.focus();
    return null;
  }
  return updateSiteMetaRecord(editor, { seo: seoPatch });
};

export default saveSiteSettingsRecord;
