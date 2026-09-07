import escapeHtmlText from '../support/escapeHtmlText.js';

const buildRepeaterEmptyStateMarkup = (sourceName, hasTemplate, emptyText) => {
  const safeName = escapeHtmlText(sourceName || 'none');
  const messageText = hasTemplate
    ? emptyText
      ? `Visitors will see: "${escapeHtmlText(emptyText)}"`
      : `No items found in the "${safeName}" source.`
    : 'This repeater has no item template.';
  const actionMarkup = hasTemplate
    ? '<button type="button" class="db-repeater-empty-action" data-db-repeater-edit-data>Open data sources</button>'
    : '<button type="button" class="db-repeater-empty-action" data-db-repeater-restore>Restore the item template</button>';
  return [
    '<div class="db-repeater-empty" data-db-repeater-preview="true">',
    `<p class="db-repeater-empty-text">${messageText}</p>`,
    actionMarkup,
    '</div>',
  ].join('');
};

export default buildRepeaterEmptyStateMarkup;
