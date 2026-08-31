import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoFieldLabelMarkup = (fieldKey, labelText, badgeMarkup) =>
  '<label class="gjs-db-field-label gjs-db-seo-label-row" for="gjs-db-seo-' +
  fieldKey +
  '"><span>' +
  escapeHtmlText(labelText) +
  '</span>' +
  (badgeMarkup || '') +
  '</label>';

export default buildSeoFieldLabelMarkup;
