import escapeHtmlText from '../support/escapeHtmlText.js';

const buildRepeaterEmptyMessageMarkup = (emptyText) =>
  `<div class="db-repeater-empty">${escapeHtmlText(emptyText)}</div>`;

export default buildRepeaterEmptyMessageMarkup;
