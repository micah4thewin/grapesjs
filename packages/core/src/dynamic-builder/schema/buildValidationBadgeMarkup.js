import escapeHtmlText from '../support/escapeHtmlText.js';
import resolveSchemaFieldLabels from './resolveSchemaFieldLabels.js';

const buildLabelledBadge = (className, prefixText, groupKey, fieldKeys) =>
  '<span class="gjs-db-badge' +
  className +
  '">' +
  prefixText +
  escapeHtmlText(resolveSchemaFieldLabels(groupKey, fieldKeys).join(', ')) +
  '</span>';

const buildValidationBadgeMarkup = (validationResult, groupKey, options = {}) => {
  const resultRecord = validationResult || {};
  if (options.isUntouched) {
    return (
      '<span class="gjs-db-badge">Not published yet</span>' +
      '<span class="gjs-db-muted">Add a name and website address to include it.</span>'
    );
  }
  const invalidKeys = Array.isArray(resultRecord.invalid) ? resultRecord.invalid : [];
  if (invalidKeys.length) return buildLabelledBadge(' gjs-db-badge-error', 'Check: ', groupKey, invalidKeys);
  const missingRequired = resultRecord.missingRequired || [];
  if (missingRequired.length) return buildLabelledBadge(' gjs-db-badge-error', 'Missing: ', groupKey, missingRequired);
  const missingRecommended = resultRecord.missingRecommended || [];
  if (missingRecommended.length) {
    return buildLabelledBadge(' gjs-db-badge-warning', 'Recommended: ', groupKey, missingRecommended);
  }
  return '<span class="gjs-db-badge gjs-db-badge-success">Complete</span>';
};

export default buildValidationBadgeMarkup;
