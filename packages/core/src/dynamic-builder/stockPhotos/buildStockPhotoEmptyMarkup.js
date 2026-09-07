import escapeHtmlText from '../support/escapeHtmlText.js';

const buildStockPhotoEmptyMarkup = (messageText) =>
  messageText ? '<p class="gjs-db-stock-empty gjs-db-muted">' + escapeHtmlText(messageText) + '</p>' : '';

export default buildStockPhotoEmptyMarkup;
