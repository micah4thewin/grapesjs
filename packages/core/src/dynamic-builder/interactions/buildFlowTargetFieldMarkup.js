import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildFlowTargetFieldMarkup = (fieldRecord, currentValue, sharedAttributes, labelMarkup) =>
  [
    '<div class="gjs-db-flow-field gjs-db-flow-field-target">',
    '<label class="gjs-db-flow-target-label">',
    labelMarkup,
    '<span class="gjs-db-flow-target-row">',
    '<input type="text" value="' +
      escapeHtmlText(currentValue) +
      '" placeholder="' +
      escapeHtmlText(fieldRecord.placeholder || '') +
      '"' +
      sharedAttributes +
      ' data-db-flow-target-input>',
    '<button type="button" class="gjs-db-button gjs-db-flow-icon-button" data-db-flow-action="pick" ',
    'title="Pick an element on the page" aria-label="Pick the target on the page">',
    getIconMarkup('crosshair', { size: 15 }),
    '</button>',
    '</span>',
    '</label>',
    '<span class="gjs-db-flow-target-hint" data-db-flow-target-hint aria-live="polite"></span>',
    '</div>',
  ].join('');

export default buildFlowTargetFieldMarkup;
