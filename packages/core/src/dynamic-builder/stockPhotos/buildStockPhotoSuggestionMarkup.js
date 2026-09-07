import escapeHtmlText from '../support/escapeHtmlText.js';
import getStockPhotoSuggestionRecords from './getStockPhotoSuggestionRecords.js';

const buildStockPhotoSuggestionMarkup = () =>
  getStockPhotoSuggestionRecords()
    .map(
      (suggestionText) =>
        '<button type="button" class="gjs-db-stock-chip" data-db-stock-suggestion="' +
        escapeHtmlText(suggestionText) +
        '">' +
        escapeHtmlText(suggestionText) +
        '</button>',
    )
    .join('');

export default buildStockPhotoSuggestionMarkup;
