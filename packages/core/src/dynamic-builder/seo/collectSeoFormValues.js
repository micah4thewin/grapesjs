import getSeoFieldNormalizers from './getSeoFieldNormalizers.js';
import normalizeRobotsExtraLines from './normalizeRobotsExtraLines.js';

const collectSeoFormValues = (sectionElement) => {
  const formValues = {};
  if (!sectionElement) return formValues;
  const fieldNormalizers = getSeoFieldNormalizers();
  sectionElement.querySelectorAll('[data-db-seo-field]').forEach((fieldElement) => {
    const fieldKey = fieldElement.dataset.dbSeoField;
    if (!fieldKey || fieldElement.disabled) return;
    if (fieldElement.type === 'checkbox') {
      formValues[fieldKey] = !!fieldElement.checked;
      return;
    }
    const rawValue = String(fieldElement.value || '').trim();
    const normalizeValue = fieldNormalizers[fieldKey];
    formValues[fieldKey] = normalizeValue ? normalizeValue(rawValue) || rawValue : rawValue;
  });
  if (Object.prototype.hasOwnProperty.call(formValues, 'robotsExtra')) {
    formValues.robotsExtra = normalizeRobotsExtraLines(formValues.robotsExtra);
  }
  return formValues;
};

export default collectSeoFormValues;
