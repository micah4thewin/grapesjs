import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildIconButtonMarkup = (actionAttribute, actionValue, iconName, labelText, extraClass) => {
  const classNames = ['gjs-db-button', 'gjs-db-icon-button', extraClass || ''].join(' ').trim();
  return [
    `<button type="button" class="${classNames}" ${actionAttribute}="${escapeHtmlText(actionValue)}" `,
    `aria-label="${escapeHtmlText(labelText)}" title="${escapeHtmlText(labelText)}">`,
    getIconMarkup(iconName, { size: 16 }),
    '</button>',
  ].join('');
};

export default buildIconButtonMarkup;
