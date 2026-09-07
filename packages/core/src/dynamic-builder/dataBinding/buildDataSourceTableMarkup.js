import buildDataSourceCellMarkup from './buildDataSourceCellMarkup.js';
import buildIconButtonMarkup from './buildIconButtonMarkup.js';
import collectSourceFieldNames from './collectSourceFieldNames.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildHeaderCell = (fieldName) =>
  [
    '<th><div class="gjs-db-source-field-head">',
    `<input type="text" class="gjs-db-field-input gjs-db-source-field-name" data-db-field-name="${escapeHtmlText(fieldName)}" `,
    `value="${escapeHtmlText(fieldName)}" aria-label="Field name" spellcheck="false">`,
    buildIconButtonMarkup('data-db-field-remove', fieldName, 'close', `Remove field ${fieldName}`),
    '</div></th>',
  ].join('');

const buildRowMarkup = (sourceItem, rowIndex, fieldNames, rowCount) =>
  [
    `<tr data-db-row="${rowIndex}"><td class="gjs-db-source-row-num">${rowIndex + 1}</td>`,
    ...fieldNames.map(
      (fieldName) =>
        `<td>${buildDataSourceCellMarkup(rowIndex, fieldName, isPlainRecord(sourceItem) ? sourceItem[fieldName] : '')}</td>`,
    ),
    '<td class="gjs-db-source-row-tools">',
    rowIndex > 0
      ? buildIconButtonMarkup('data-db-row-up', String(rowIndex), 'arrowUp', `Move item ${rowIndex + 1} up`)
      : '',
    rowIndex < rowCount - 1
      ? buildIconButtonMarkup('data-db-row-down', String(rowIndex), 'arrowDown', `Move item ${rowIndex + 1} down`)
      : '',
    buildIconButtonMarkup('data-db-row-remove', String(rowIndex), 'trash', `Remove item ${rowIndex + 1}`),
    '</td></tr>',
  ].join('');

const buildDataSourceTableMarkup = (sourceItems) => {
  const safeItems = Array.isArray(sourceItems) ? sourceItems : [];
  const fieldNames = collectSourceFieldNames(safeItems);
  const emptyMessage = fieldNames.length
    ? 'No items yet. Add an item or paste rows copied from a spreadsheet.'
    : 'Start by adding a field, or paste rows copied from a spreadsheet.';
  const bodyMarkup = safeItems.length
    ? safeItems
        .map((sourceItem, rowIndex) => buildRowMarkup(sourceItem, rowIndex, fieldNames, safeItems.length))
        .join('')
    : `<tr><td class="gjs-db-source-empty" colspan="${fieldNames.length + 2}">${emptyMessage}</td></tr>`;
  return [
    '<div class="gjs-db-source-table-wrap"><table class="gjs-db-source-table"><thead><tr>',
    '<th class="gjs-db-source-row-num" aria-label="Item number">#</th>',
    fieldNames.map(buildHeaderCell).join(''),
    '<th class="gjs-db-source-row-tools" aria-label="Item actions"></th>',
    `</tr></thead><tbody>${bodyMarkup}</tbody></table></div>`,
    '<div class="gjs-db-button-row gjs-db-source-toolbar">',
    '<button type="button" class="gjs-db-button" data-db-row-add>Add item</button>',
    '<button type="button" class="gjs-db-button" data-db-field-add>Add field</button>',
    '<button type="button" class="gjs-db-button" data-db-paste-toggle aria-expanded="false">Paste rows</button>',
    '</div>',
  ].join('');
};

export default buildDataSourceTableMarkup;
