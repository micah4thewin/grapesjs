import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildMenuItemMarkup = (labelText, iconName, attributesText) => {
  const safeLabel = escapeHtmlText(labelText);
  const extraAttributes = attributesText ? ` ${attributesText}` : '';
  return [
    `<button type="button" class="gjs-db-menu-item" role="menuitem"${extraAttributes}>`,
    getIconMarkup(iconName, { size: 15 }),
    `<span class="gjs-db-menu-item-label">${safeLabel}</span>`,
    '</button>',
  ].join('');
};

export default buildMenuItemMarkup;
