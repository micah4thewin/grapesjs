import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildFlowIconButtonMarkup = (actionName, iconName, labelText, extraClassName = '') =>
  [
    '<button type="button" class="gjs-db-button gjs-db-flow-icon-button ' + extraClassName + '" ',
    'data-db-flow-action="' + escapeHtmlText(actionName) + '" ',
    'title="' + escapeHtmlText(labelText) + '" aria-label="' + escapeHtmlText(labelText) + '">',
    getIconMarkup(iconName, { size: 15 }),
    '</button>',
  ].join('');

export default buildFlowIconButtonMarkup;
