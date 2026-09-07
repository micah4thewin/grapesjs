import buildStockPhotoSuggestionMarkup from './buildStockPhotoSuggestionMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const describeIntroText = (moduleOptions) => {
  const providerRecord = moduleOptions.provider;
  if (!providerRecord) return moduleOptions.missingProviderNotice;
  return 'Photos come from ' + providerRecord.providerName + '. ' + providerRecord.licenceSummary;
};

const buildStockPhotoModalMarkup = (moduleOptions) => {
  const disabledText = moduleOptions.adapter ? '' : ' disabled';
  return [
    '<div class="gjs-db-form gjs-db-stock-photos" data-db-stock-root>',
    '<p class="gjs-db-muted">' + escapeHtmlText(describeIntroText(moduleOptions)) + '</p>',
    '<form class="gjs-db-stock-search" data-db-stock-form>',
    '<div class="gjs-db-field gjs-db-stock-field">',
    '<label class="gjs-db-field-label" for="gjs-db-stock-query">What should the picture show</label>',
    '<input id="gjs-db-stock-query" type="search" class="gjs-db-field-input" data-db-stock-search',
    ' placeholder="Try beach, office desk or coffee" autocomplete="off"' + disabledText + '>',
    '</div>',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-stock-submit' + disabledText + '>',
    getIconMarkup('search', { size: 15 }),
    'Search</button>',
    '</form>',
    moduleOptions.adapter
      ? '<div class="gjs-db-stock-chips" data-db-stock-suggestions>' + buildStockPhotoSuggestionMarkup() + '</div>'
      : '',
    '<p class="gjs-db-field-help gjs-db-stock-status" data-db-stock-status role="status" aria-live="polite"></p>',
    '<div class="gjs-db-stock-grid" data-db-stock-grid role="group" aria-label="Photo results"></div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-stock-more hidden>Show more photos</button>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildStockPhotoModalMarkup;
