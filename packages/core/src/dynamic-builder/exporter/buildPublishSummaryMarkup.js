import escapeHtmlText from '../support/escapeHtmlText.js';

const buildPublishSummaryMarkup = (auditSummaries) => {
  const summaryList = Array.isArray(auditSummaries) ? auditSummaries : [];
  const hasErrors = summaryList.some((auditSummary) => auditSummary.severityCounts.error > 0);
  const summaryRows = summaryList.map((auditSummary) => {
    const badgeParts = [
      '<span class="gjs-db-badge gjs-db-badge-error">' + auditSummary.severityCounts.error + ' errors</span>',
      '<span class="gjs-db-badge gjs-db-badge-warning">' + auditSummary.severityCounts.warning + ' warnings</span>',
      '<span class="gjs-db-badge">' + auditSummary.severityCounts.info + ' notes</span>',
    ];
    return [
      '<div class="gjs-db-list-item gjs-db-export-row">',
      '<span>' + escapeHtmlText(auditSummary.auditLabel) + '</span>',
      '<span>' + badgeParts.join('') + '</span>',
      '</div>',
    ].join('');
  });
  const noteText = hasErrors
    ? 'Audit errors were found. Review them in the audit report before publishing.'
    : 'No audit errors were found. The full bundle downloads on continue.';
  return [
    '<div class="gjs-db-report gjs-db-publish-summary" data-db-publish-root>',
    '<div class="gjs-db-section-title">Audit summary</div>',
    '<div class="gjs-db-list">' + summaryRows.join('') + '</div>',
    '<div class="gjs-db-field-help">' + escapeHtmlText(noteText) + '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-publish-report>Open audit report</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-publish-continue>' +
      (hasErrors ? 'Continue anyway' : 'Continue') +
      '</button>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildPublishSummaryMarkup;
