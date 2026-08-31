const buildCharacterCounterBadgeMarkup = (fieldKey, warnLimit) =>
  '<span class="gjs-db-badge gjs-db-seo-counter" data-db-seo-counter="' +
  fieldKey +
  '" data-db-seo-limit="' +
  warnLimit +
  '">0 / ' +
  warnLimit +
  '</span>';

export default buildCharacterCounterBadgeMarkup;
