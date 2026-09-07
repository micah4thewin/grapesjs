import escapeHtmlText from '../support/escapeHtmlText.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildOptionMarkup = (optionEntry, selectedValue) =>
  '<option value="' +
  escapeHtmlText(optionEntry[0]) +
  '"' +
  (optionEntry[0] === (selectedValue || '') ? ' selected' : '') +
  '>' +
  escapeHtmlText(optionEntry[1]) +
  '</option>';

const buildSchemaSelectOptionsMarkup = (optionEntries, selectedValue) =>
  (Array.isArray(optionEntries) ? optionEntries : [])
    .map((optionEntry) => {
      if (isPlainRecord(optionEntry) && Array.isArray(optionEntry.options)) {
        return (
          '<optgroup label="' +
          escapeHtmlText(optionEntry.label || '') +
          '">' +
          optionEntry.options.map((groupedEntry) => buildOptionMarkup(groupedEntry, selectedValue)).join('') +
          '</optgroup>'
        );
      }
      return buildOptionMarkup(optionEntry, selectedValue);
    })
    .join('');

export default buildSchemaSelectOptionsMarkup;
