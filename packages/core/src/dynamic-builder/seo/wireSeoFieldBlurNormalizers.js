import getSeoFieldNormalizers from './getSeoFieldNormalizers.js';

const wireSeoFieldBlurNormalizers = (rootElement, refreshLiveFeedback) => {
  const fieldNormalizers = getSeoFieldNormalizers();
  rootElement.addEventListener('focusout', (focusEvent) => {
    const fieldElement = focusEvent.target;
    if (!fieldElement || !fieldElement.dataset || !fieldElement.dataset.dbSeoField) return;
    fieldElement.dataset.dbSeoTouched = 'true';
    const normalizeValue = fieldNormalizers[fieldElement.dataset.dbSeoField];
    if (normalizeValue && fieldElement.type !== 'checkbox') {
      const normalizedValue = normalizeValue(fieldElement.value);
      if (normalizedValue && normalizedValue !== fieldElement.value) fieldElement.value = normalizedValue;
    }
    refreshLiveFeedback();
  });
};

export default wireSeoFieldBlurNormalizers;
