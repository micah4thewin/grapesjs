import escapeHtmlText from '../support/escapeHtmlText.js';

const buildValidationBadgeMarkup = (validationResult) => {
  if (validationResult.missingRequired.length) {
    return (
      '<span class="gjs-db-badge gjs-db-badge-error">Missing required: ' +
      escapeHtmlText(validationResult.missingRequired.join(', ')) +
      '</span>'
    );
  }
  if (validationResult.missingRecommended.length) {
    return (
      '<span class="gjs-db-badge gjs-db-badge-warning">Recommended: ' +
      escapeHtmlText(validationResult.missingRecommended.join(', ')) +
      '</span>'
    );
  }
  return '<span class="gjs-db-badge gjs-db-badge-success">Complete</span>';
};

export default buildValidationBadgeMarkup;
