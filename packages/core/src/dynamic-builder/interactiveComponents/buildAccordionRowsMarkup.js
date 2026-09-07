import buildListRowMarkup from './buildListRowMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import readAccordionItemRecords from './readAccordionItemRecords.js';

const buildAccordionRowsMarkup = (accordionComponent) => {
  const itemRecords = readAccordionItemRecords(accordionComponent);
  if (!itemRecords.length) return '<p class="gjs-db-muted">No questions yet. Add the first one below.</p>';
  return itemRecords
    .map((itemRecord, itemIndex) =>
      buildListRowMarkup(
        itemIndex,
        `<input class="gjs-db-field-input" data-db-list-field="label" value="${escapeHtmlText(itemRecord.labelText)}" placeholder="Question" aria-label="Question">` +
          '<label class="gjs-db-list-check">' +
          `<input type="checkbox" data-db-list-field="open"${itemRecord.isOpen ? ' checked' : ''}>` +
          '<span>Open on load</span></label>',
      ),
    )
    .join('');
};

export default buildAccordionRowsMarkup;
