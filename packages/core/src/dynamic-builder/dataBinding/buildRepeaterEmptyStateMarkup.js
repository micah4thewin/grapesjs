import escapeHtmlText from '../support/escapeHtmlText.js';

const buildRepeaterEmptyStateMarkup = (sourceName, hasTemplate) => {
  const safeName = escapeHtmlText(sourceName || 'none');
  const noteText = hasTemplate
    ? `No items found in the "${safeName}" source. Open Data sources to add items.`
    : 'This repeater has no item template. Drop a Repeater Item inside it to define one.';
  return `<div class="db-repeater-empty" data-db-repeater-preview="true">${noteText}</div>`;
};

export default buildRepeaterEmptyStateMarkup;
