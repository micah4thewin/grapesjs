import buildSeoFieldAttributesMarkup from './buildSeoFieldAttributesMarkup.js';
import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import buildSeoFieldLabelMarkup from './buildSeoFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoSelectFieldMarkup = (fieldKey, labelText, helpText, selectedValue, optionEntries) => {
  const optionMarkup = optionEntries
    .map(
      (optionEntry) =>
        '<option value="' +
        escapeHtmlText(optionEntry[0]) +
        '"' +
        (optionEntry[0] === (selectedValue || '') ? ' selected' : '') +
        '>' +
        escapeHtmlText(optionEntry[1]) +
        '</option>',
    )
    .join('');
  return [
    '<div class="gjs-db-field" data-db-seo-field-wrap="' + escapeHtmlText(fieldKey) + '">',
    buildSeoFieldLabelMarkup(fieldKey, labelText, ''),
    '<select class="gjs-db-field-input"' + buildSeoFieldAttributesMarkup(fieldKey) + '>',
    optionMarkup,
    '</select>',
    buildSeoFieldHelpMarkup(fieldKey, helpText),
    '</div>',
  ].join('');
};

export default buildSeoSelectFieldMarkup;
