const buildCharacterCounterBadgeMarkup = (fieldKey, minLength, warnLimit) =>
  [
    '<span class="gjs-db-badge gjs-db-seo-counter" id="gjs-db-seo-counter-' + fieldKey + '"',
    ' data-db-seo-counter="' + fieldKey + '" data-db-seo-min="' + minLength + '" data-db-seo-limit="' + warnLimit + '"',
    '>0 / ' + warnLimit + ' characters</span>',
  ].join('');

export default buildCharacterCounterBadgeMarkup;
