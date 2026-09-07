import buildIconButtonMarkup from './buildIconButtonMarkup.js';
import formatCellText from './formatCellText.js';
import readCellKind from './readCellKind.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildFieldRowMarkup = (fieldName, fieldValue) => {
  const safeField = escapeHtmlText(fieldName);
  return [
    `<div class="gjs-db-source-field-row" data-db-object-field="${safeField}">`,
    `<input type="text" class="gjs-db-field-input gjs-db-source-field-name" data-db-object-key="${safeField}" `,
    `value="${safeField}" aria-label="Field name" spellcheck="false">`,
    `<input type="text" class="gjs-db-field-input" data-db-object-value="${safeField}" `,
    `data-db-cell-kind="${readCellKind(fieldValue)}" value="${escapeHtmlText(formatCellText(fieldValue))}" `,
    `aria-label="Value for ${safeField}">`,
    buildIconButtonMarkup('data-db-object-remove', fieldName, 'close', `Remove field ${fieldName}`),
    '</div>',
  ].join('');
};

const buildDataSourceFieldsMarkup = (sourceRecord) => {
  const safeRecord = isPlainRecord(sourceRecord) ? sourceRecord : {};
  const fieldNames = Object.keys(safeRecord);
  const rowsMarkup = fieldNames.length
    ? fieldNames.map((fieldName) => buildFieldRowMarkup(fieldName, safeRecord[fieldName])).join('')
    : '<p class="gjs-db-source-empty">No fields yet. Add a field to store a value such as a phone number.</p>';
  return [
    `<div class="gjs-db-source-fields">${rowsMarkup}</div>`,
    '<div class="gjs-db-button-row gjs-db-source-toolbar">',
    '<button type="button" class="gjs-db-button" data-db-object-add>Add field</button>',
    '</div>',
  ].join('');
};

export default buildDataSourceFieldsMarkup;
