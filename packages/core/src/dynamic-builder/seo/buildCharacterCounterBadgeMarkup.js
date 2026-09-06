const buildCharacterCounterBadgeMarkup = (fieldKey, warnLimit) =>
  [
    '<span class="gjs-db-badge gjs-db-seo-counter" id="gjs-db-seo-counter-' + fieldKey + '"',
    ' data-db-seo-counter="' + fieldKey + '" data-db-seo-limit="' + warnLimit + '"',
    ' role="status" aria-live="polite">0 / ' + warnLimit + ' characters</span>',
  ].join('');

export default buildCharacterCounterBadgeMarkup;
