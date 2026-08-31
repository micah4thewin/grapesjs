import escapeHtmlText from '../support/escapeHtmlText.js';
import parseOptionLinesText from './parseOptionLinesText.js';

const buildSelectOptionsMarkup = (optionsText) =>
  parseOptionLinesText(optionsText)
    .map(
      (optionEntry) =>
        '<option value="' +
        escapeHtmlText(optionEntry.optionValue) +
        '">' +
        escapeHtmlText(optionEntry.optionLabel) +
        '</option>',
    )
    .join('');

export default buildSelectOptionsMarkup;
