import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoFieldAttributesMarkup = (fieldKey, options = {}) => {
  const safeKey = escapeHtmlText(fieldKey);
  const describedByIds = ['gjs-db-seo-help-' + safeKey];
  if (options.hasCounter) describedByIds.push('gjs-db-seo-counter-' + safeKey);
  describedByIds.push('gjs-db-seo-error-' + safeKey);
  return [
    ' id="gjs-db-seo-' + safeKey + '"',
    ' data-db-seo-field="' + safeKey + '"',
    ' aria-describedby="' + describedByIds.join(' ') + '"',
    options.isDisabled ? ' disabled' : '',
    options.placeholder ? ' placeholder="' + escapeHtmlText(options.placeholder) + '"' : '',
  ].join('');
};

export default buildSeoFieldAttributesMarkup;
