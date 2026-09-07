import buildListRowActionsMarkup from './buildListRowActionsMarkup.js';
import buildListRowLinkFieldMarkup from './buildListRowLinkFieldMarkup.js';
import collectListRowRecords from './collectListRowRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildMenuItemRowsMarkup = (editor, rootComponent, listSelector, emptyMessage) => {
  const rowRecords = collectListRowRecords(rootComponent, listSelector);
  if (!rowRecords.length) return `<p class="gjs-db-muted gjs-db-menu-empty">${escapeHtmlText(emptyMessage)}</p>`;
  return rowRecords
    .map((rowRecord, rowIndex) => {
      const itemText = `Item ${rowIndex + 1}`;
      return [
        `<div class="gjs-db-menu-row" data-db-menu-row="${rowIndex}">`,
        '<div class="gjs-db-menu-row-fields">',
        `<input class="gjs-db-field-input" data-db-menu-field="label" value="${escapeHtmlText(rowRecord.labelText)}"`,
        ` placeholder="Text shown in the menu" aria-label="${escapeHtmlText(`${itemText} text`)}">`,
        buildListRowLinkFieldMarkup(editor, rowRecord.linkComponent, itemText),
        '</div>',
        buildListRowActionsMarkup(rowIndex, rowRecords.length, 'item'),
        '</div>',
      ].join('');
    })
    .join('');
};

export default buildMenuItemRowsMarkup;
