import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSymbolPlaceholderMarkup = (messageText) =>
  '<div class="db-symbol-placeholder" data-db-symbol-placeholder="true">' + escapeHtmlText(messageText) + '</div>';

export default buildSymbolPlaceholderMarkup;
