import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildPagesMenuIconButtonMarkup = (actionName, pageId, iconName, accessibleLabel, shortTitle, extraAttributes) => {
  const safeLabel = escapeHtmlText(accessibleLabel);
  const extraText = extraAttributes ? ` ${extraAttributes}` : '';
  return [
    `<button type="button" class="gjs-db-menu-icon-button" role="menuitem" data-db-page-action="${actionName}"`,
    ` data-db-page-id="${escapeHtmlText(pageId)}" aria-label="${safeLabel}" title="${escapeHtmlText(shortTitle)}"${extraText}>`,
    getIconMarkup(iconName, { size: 14 }),
    '</button>',
  ].join('');
};

export default buildPagesMenuIconButtonMarkup;
