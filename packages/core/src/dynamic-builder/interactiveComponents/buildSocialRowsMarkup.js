import collectListItemRecords from '../support/collectListItemRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getSocialNetworkRecords from './getSocialNetworkRecords.js';

const buildSocialRowsMarkup = (rootComponent) => {
  const itemRecords = collectListItemRecords(rootComponent, '');
  if (!itemRecords.length) return '<p class="gjs-db-muted">No profiles yet. Add your first one below.</p>';
  const networkRecords = getSocialNetworkRecords();
  return itemRecords
    .map((itemRecord, itemIndex) => {
      const attributeRecord = itemRecord.linkComponent.getAttributes ? itemRecord.linkComponent.getAttributes() : {};
      const currentNetwork = String(attributeRecord['data-db-network'] || '');
      const optionsMarkup = networkRecords
        .map((networkRecord) => {
          const selectedAttribute = networkRecord.networkName === currentNetwork ? ' selected' : '';
          return `<option value="${escapeHtmlText(networkRecord.networkName)}"${selectedAttribute}>${escapeHtmlText(networkRecord.networkLabel)}</option>`;
        })
        .join('');
      return [
        `<div class="gjs-db-menu-row" data-db-menu-row="${itemIndex}">`,
        '<div class="gjs-db-menu-row-fields">',
        `<select class="gjs-db-field-input" data-db-social-field="network">${optionsMarkup}</select>`,
        `<input class="gjs-db-field-input" data-db-social-field="href" value="${escapeHtmlText(itemRecord.linkHref)}" placeholder="Profile URL">`,
        '</div>',
        '<div class="gjs-db-menu-row-actions">',
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="-1" title="Move up">${getIconMarkup('arrowUp', { size: 14, label: 'Move up' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-move="1" title="Move down">${getIconMarkup('arrowDown', { size: 14, label: 'Move down' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-menu-remove="true" title="Remove">${getIconMarkup('trash', { size: 14, label: 'Remove' })}</button>`,
        '</div>',
        '</div>',
      ].join('');
    })
    .join('');
};

export default buildSocialRowsMarkup;
