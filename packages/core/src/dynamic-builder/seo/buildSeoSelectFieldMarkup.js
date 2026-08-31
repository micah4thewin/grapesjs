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
    '<div class="gjs-db-field">',
    buildSeoFieldLabelMarkup(fieldKey, labelText, ''),
    '<select class="gjs-db-field-input" id="gjs-db-seo-' + fieldKey + '" data-db-seo-field="' + fieldKey + '">',
    optionMarkup,
    '</select>',
    buildSeoFieldHelpMarkup(helpText),
    '</div>',
  ].join('');
};

export default buildSeoSelectFieldMarkup;
