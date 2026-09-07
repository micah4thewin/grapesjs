import escapeHtmlText from '../support/escapeHtmlText.js';
import resolveSchemaFieldLabels from './resolveSchemaFieldLabels.js';

const richResultNames = { Article: 'Article', Product: 'Product', Event: 'Event', FAQPage: 'FAQ' };

const buildRichResultReadinessMarkup = (pageType, validationResult) => {
  const resultName = richResultNames[pageType];
  if (!resultName) {
    return (
      '<span class="gjs-db-badge">No rich result type</span>' +
      '<span class="gjs-db-muted">Pick Article, Product, Event or FAQ page on the This page tab to qualify.</span>'
    );
  }
  const resultRecord = validationResult || {};
  const blockingKeys = [...(resultRecord.invalid || []), ...(resultRecord.missingRequired || [])];
  if (blockingKeys.length) {
    return (
      '<span class="gjs-db-badge gjs-db-badge-warning">' +
      resultName +
      ' rich result not ready</span>' +
      '<span class="gjs-db-muted">Needs: ' +
      escapeHtmlText(resolveSchemaFieldLabels(pageType, blockingKeys).join(', ')) +
      '.</span>'
    );
  }
  const recommendedKeys = resultRecord.missingRecommended || [];
  return (
    '<span class="gjs-db-badge gjs-db-badge-success">Qualifies for ' +
    resultName +
    ' rich result</span>' +
    (recommendedKeys.length
      ? '<span class="gjs-db-muted">Optional: ' +
        escapeHtmlText(resolveSchemaFieldLabels(pageType, recommendedKeys).join(', ')) +
        '.</span>'
      : '')
  );
};

export default buildRichResultReadinessMarkup;
