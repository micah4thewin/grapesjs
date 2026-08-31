import escapeHtmlText from '../support/escapeHtmlText.js';

const buildCodeSlotFieldMarkup = (slotName, labelText, helpText, slotValue) => {
  const fieldId = 'gjs-db-custom-code-' + slotName.toLowerCase();
  return [
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="' + fieldId + '">' + escapeHtmlText(labelText) + '</label>',
    '<textarea class="gjs-db-field-input" id="' + fieldId + '" data-db-code-slot="' + slotName + '" rows="5">',
    escapeHtmlText(slotValue),
    '</textarea>',
    '<span class="gjs-db-field-help">' + escapeHtmlText(helpText) + '</span>',
    '</div>',
  ].join('');
};

export default buildCodeSlotFieldMarkup;
