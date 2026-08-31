import normalizeRobotsExtraLines from './normalizeRobotsExtraLines.js';
import toSlugText from '../support/toSlugText.js';

const collectSeoFormValues = (sectionElement) => {
  const formValues = {};
  if (!sectionElement) return formValues;
  sectionElement.querySelectorAll('[data-db-seo-field]').forEach((fieldElement) => {
    const fieldKey = fieldElement.dataset.dbSeoField;
    if (!fieldKey) return;
    if (fieldElement.type === 'checkbox') {
      formValues[fieldKey] = !!fieldElement.checked;
      return;
    }
    formValues[fieldKey] = String(fieldElement.value || '').trim();
  });
  if (Object.prototype.hasOwnProperty.call(formValues, 'robotsExtra')) {
    formValues.robotsExtra = normalizeRobotsExtraLines(formValues.robotsExtra);
  }
  if (formValues.slug) formValues.slug = toSlugText(formValues.slug);
  return formValues;
};

export default collectSeoFormValues;
