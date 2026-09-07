import getIconMarkup from '../support/getIconMarkup.js';

const buildListRowMarkup = (rowIndex, fieldsMarkup) =>
  [
    `<div class="gjs-db-menu-row" data-db-menu-row="${rowIndex}">`,
    `<div class="gjs-db-menu-row-fields">${fieldsMarkup}</div>`,
    '<div class="gjs-db-menu-row-actions">',
    `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="-1" title="Move up">${getIconMarkup('arrowUp', { size: 14, label: 'Move up' })}</button>`,
    `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="1" title="Move down">${getIconMarkup('arrowDown', { size: 14, label: 'Move down' })}</button>`,
    `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-remove="true" title="Remove">${getIconMarkup('trash', { size: 14, label: 'Remove' })}</button>`,
    '</div>',
    '</div>',
  ].join('');

export default buildListRowMarkup;
