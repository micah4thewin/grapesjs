import formatCellText from './formatCellText.js';
import readCellKind from './readCellKind.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildDataSourceCellMarkup = (rowIndex, fieldName, cellValue) => {
  const cellText = formatCellText(cellValue);
  const safeField = escapeHtmlText(fieldName);
  const sharedAttributes = [
    'class="gjs-db-field-input gjs-db-source-cell"',
    `data-db-cell-row="${rowIndex}"`,
    `data-db-cell-field="${safeField}"`,
    `data-db-cell-kind="${readCellKind(cellValue)}"`,
    `aria-label="${safeField}, item ${rowIndex + 1}"`,
  ].join(' ');
  if (cellText.length > 70 || cellText.indexOf('\n') >= 0) {
    return `<textarea ${sharedAttributes} rows="2">${escapeHtmlText(cellText)}</textarea>`;
  }
  return `<input type="text" ${sharedAttributes} value="${escapeHtmlText(cellText)}">`;
};

export default buildDataSourceCellMarkup;
