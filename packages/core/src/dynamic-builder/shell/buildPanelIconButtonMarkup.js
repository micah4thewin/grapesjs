import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildPanelIconButtonMarkup = (labelText, iconName, extraAttributesText) => {
  const safeLabel = escapeHtmlText(labelText);
  const attributesText = extraAttributesText ? ` ${extraAttributesText}` : '';
  return [
    `<button type="button" class="gjs-db-panel-button" aria-label="${safeLabel}" title="${safeLabel}"${attributesText}>`,
    getIconMarkup(iconName, { size: 16 }),
    '</button>',
  ].join('');
};

export default buildPanelIconButtonMarkup;
