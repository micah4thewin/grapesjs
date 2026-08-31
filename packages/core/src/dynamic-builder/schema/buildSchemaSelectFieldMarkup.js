import buildSchemaFieldHelpMarkup from './buildSchemaFieldHelpMarkup.js';
import buildSchemaFieldLabelMarkup from './buildSchemaFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaSelectFieldMarkup = (fieldKey, labelText, helpText, selectedValue, optionEntries) => {
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
    buildSchemaFieldLabelMarkup(fieldKey, labelText),
    '<select class="gjs-db-field-input" id="gjs-db-schema-' +
      escapeHtmlText(fieldKey) +
      '" data-db-schema-field="' +
      escapeHtmlText(fieldKey) +
      '">',
    optionMarkup,
    '</select>',
    buildSchemaFieldHelpMarkup(helpText),
    '</div>',
  ].join('');
};

export default buildSchemaSelectFieldMarkup;
