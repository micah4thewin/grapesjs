import escapeHtmlText from '../support/escapeHtmlText.js';
import parseOptionLinesText from './parseOptionLinesText.js';

const buildRadioGroupChildrenMarkup = (legendText, groupName, optionsText) => {
  const safeGroupName = escapeHtmlText(String(groupName || 'choice').trim() || 'choice');
  const radioMarkupList = parseOptionLinesText(optionsText).map((optionEntry) =>
    [
      '<label class="db-choice">',
      '<input type="radio" name="' + safeGroupName + '" value="' + escapeHtmlText(optionEntry.optionValue) + '">',
      '<span class="db-choice-text">' + escapeHtmlText(optionEntry.optionLabel) + '</span>',
      '</label>',
    ].join(''),
  );
  return [
    '<legend class="db-field-label" data-db-radio-legend="true">',
    escapeHtmlText(String(legendText || 'Choose an option')),
    '</legend>',
    '<div class="db-choice-list" data-db-radio-options="true">',
    radioMarkupList.join(''),
    '</div>',
  ].join('');
};

export default buildRadioGroupChildrenMarkup;
