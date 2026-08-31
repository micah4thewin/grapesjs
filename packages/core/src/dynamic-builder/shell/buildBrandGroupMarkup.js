import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildBrandGroupMarkup = (brandLabelText) =>
  [
    '<div class="gjs-db-panel-group gjs-db-shell-brand-group">',
    getIconMarkup('appShell', { size: 16 }),
    `<span class="gjs-db-shell-brand">${escapeHtmlText(brandLabelText)}</span>`,
    '</div>',
  ].join('');

export default buildBrandGroupMarkup;
