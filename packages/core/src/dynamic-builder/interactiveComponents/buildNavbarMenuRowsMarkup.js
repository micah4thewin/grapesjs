import collectListItemRecords from '../support/collectListItemRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildNavbarMenuRowsMarkup = (rootComponent, listSelector, emptyMessage) => {
  const itemRecords = collectListItemRecords(rootComponent, listSelector);
  if (!itemRecords.length) return `<p class="gjs-db-muted">${escapeHtmlText(emptyMessage)}</p>`;
  return itemRecords
    .map((itemRecord, itemIndex) =>
      [
        `<div class="gjs-db-menu-row" data-db-menu-row="${itemIndex}">`,
        '<div class="gjs-db-menu-row-fields">',
        `<input class="gjs-db-field-input" data-db-menu-field="label" value="${escapeHtmlText(itemRecord.labelText)}" placeholder="Label">`,
        `<input class="gjs-db-field-input" data-db-menu-field="href" value="${escapeHtmlText(itemRecord.linkHref)}" placeholder="Link, like #about or about.html">`,
        '</div>',
        '<div class="gjs-db-menu-row-actions">',
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="-1" title="Move up">${getIconMarkup('arrowUp', { size: 14, label: 'Move up' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="1" title="Move down">${getIconMarkup('arrowDown', { size: 14, label: 'Move down' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-remove="true" title="Remove">${getIconMarkup('trash', { size: 14, label: 'Remove' })}</button>`,
        '</div>',
        '</div>',
      ].join(''),
    )
    .join('');
};

export default buildNavbarMenuRowsMarkup;
