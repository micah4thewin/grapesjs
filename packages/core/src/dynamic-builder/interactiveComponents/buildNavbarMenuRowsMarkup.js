import collectNavbarMenuRecords from './collectNavbarMenuRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildNavbarMenuRowsMarkup = (navbarComponent) => {
  const menuRecords = collectNavbarMenuRecords(navbarComponent);
  if (!menuRecords.length) {
    return '<p class="gjs-db-muted">No menu items yet. Add your first link below.</p>';
  }
  return menuRecords
    .map((menuRecord, itemIndex) =>
      [
        `<div class="gjs-db-menu-row" data-db-menu-row="${itemIndex}">`,
        '<div class="gjs-db-menu-row-fields">',
        `<input class="gjs-db-field-input" data-db-menu-field="label" value="${escapeHtmlText(menuRecord.labelText)}" placeholder="Menu label">`,
        `<input class="gjs-db-field-input" data-db-menu-field="href" value="${escapeHtmlText(menuRecord.linkHref)}" placeholder="Link, like #about or about.html">`,
        '</div>',
        '<div class="gjs-db-menu-row-actions">',
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="-1" title="Move up">${getIconMarkup('arrowUp', { size: 14, label: 'Move up' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="1" title="Move down">${getIconMarkup('arrowDown', { size: 14, label: 'Move down' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-remove="true" title="Remove item">${getIconMarkup('trash', { size: 14, label: 'Remove item' })}</button>`,
        '</div>',
        '</div>',
      ].join(''),
    )
    .join('');
};

export default buildNavbarMenuRowsMarkup;
