import buildSeoFieldAttributesMarkup from './buildSeoFieldAttributesMarkup.js';
import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import buildSeoFieldLabelMarkup from './buildSeoFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoImageFieldMarkup = (fieldKey, labelText, helpText, fieldValue) => {
  const safeKey = escapeHtmlText(fieldKey);
  return [
    '<div class="gjs-db-field" data-db-seo-field-wrap="' + safeKey + '">',
    buildSeoFieldLabelMarkup(fieldKey, labelText, ''),
    '<div class="gjs-db-seo-image-row">',
    '<img class="gjs-db-seo-image-thumb" alt="" data-db-seo-thumb="' + safeKey + '" hidden>',
    '<input type="text" class="gjs-db-field-input"' +
      buildSeoFieldAttributesMarkup(fieldKey, { placeholder: 'https://' }) +
      ' value="' +
      escapeHtmlText(fieldValue || '') +
      '">',
    '<button type="button" class="gjs-db-button" data-db-seo-pick-image="' +
      safeKey +
      '" aria-label="Choose image for ' +
      escapeHtmlText(labelText) +
      '">Choose image</button>',
    '</div>',
    buildSeoFieldHelpMarkup(fieldKey, helpText),
    '</div>',
  ].join('');
};

export default buildSeoImageFieldMarkup;
