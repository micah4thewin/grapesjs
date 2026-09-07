import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoFieldHelpMarkup = (fieldKey, helpText) => {
  const safeKey = escapeHtmlText(fieldKey);
  return [
    '<span class="gjs-db-field-help" id="gjs-db-seo-help-' + safeKey + '">' + escapeHtmlText(helpText) + '</span>',
    '<span class="gjs-db-field-error" id="gjs-db-seo-error-' + safeKey + '"',
    ' data-db-seo-error="' + safeKey + '" role="alert" hidden></span>',
  ].join('');
};

export default buildSeoFieldHelpMarkup;
