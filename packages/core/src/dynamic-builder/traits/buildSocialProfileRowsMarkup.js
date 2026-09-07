import buildListRowActionsMarkup from './buildListRowActionsMarkup.js';
import collectListRowRecords from './collectListRowRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getSocialNetworkRecords from '../interactiveComponents/getSocialNetworkRecords.js';

const buildNetworkOptionsMarkup = (currentNetwork) =>
  getSocialNetworkRecords()
    .map((networkRecord) => {
      const selectedAttribute = networkRecord.networkName === currentNetwork ? ' selected' : '';
      return `<option value="${escapeHtmlText(networkRecord.networkName)}"${selectedAttribute}>${escapeHtmlText(networkRecord.networkLabel)}</option>`;
    })
    .join('');

const buildSocialProfileRowsMarkup = (rootComponent, emptyMessage) => {
  const rowRecords = collectListRowRecords(rootComponent, '');
  if (!rowRecords.length) return `<p class="gjs-db-muted gjs-db-menu-empty">${escapeHtmlText(emptyMessage)}</p>`;
  return rowRecords
    .map((rowRecord, rowIndex) => {
      const itemText = `Profile ${rowIndex + 1}`;
      return [
        `<div class="gjs-db-menu-row" data-db-menu-row="${rowIndex}">`,
        '<div class="gjs-db-menu-row-fields">',
        `<select class="gjs-db-field-input" data-db-menu-field="network" aria-label="${escapeHtmlText(`${itemText} network`)}">`,
        buildNetworkOptionsMarkup(rowRecord.networkName),
        '</select>',
        `<input class="gjs-db-field-input" data-db-menu-field="href" value="${escapeHtmlText(rowRecord.linkHref)}"`,
        ` placeholder="Profile web address" inputmode="url" aria-label="${escapeHtmlText(`${itemText} web address`)}">`,
        '</div>',
        buildListRowActionsMarkup(rowIndex, rowRecords.length, 'profile'),
        '</div>',
      ].join('');
    })
    .join('');
};

export default buildSocialProfileRowsMarkup;
