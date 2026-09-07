import getSeoFieldValidators from './getSeoFieldValidators.js';
import setSeoFieldError from './setSeoFieldError.js';

const refreshSeoFieldErrors = (rootElement, siteValues, options = {}) => {
  const fieldValidators = getSeoFieldValidators();
  const blockingErrors = [];
  rootElement.querySelectorAll('[data-db-seo-field]').forEach((fieldElement) => {
    const fieldKey = fieldElement.dataset.dbSeoField;
    const validateField = fieldValidators[fieldKey];
    const isValueField = fieldElement.type !== 'checkbox' && !fieldElement.disabled;
    const rawValue = isValueField ? String(fieldElement.value || '') : '';
    const validationRecord = validateField && isValueField ? validateField(rawValue, siteValues) : '';
    const isBlocking = Boolean(validationRecord && validationRecord.isBlocking);
    if (isBlocking) blockingErrors.push({ fieldKey, fieldElement, message: validationRecord.message });
    const isVisible = !isBlocking || options.showAll || fieldElement.dataset.dbSeoTouched === 'true';
    setSeoFieldError(fieldElement, isVisible ? validationRecord : '');
  });
  return blockingErrors;
};

export default refreshSeoFieldErrors;
