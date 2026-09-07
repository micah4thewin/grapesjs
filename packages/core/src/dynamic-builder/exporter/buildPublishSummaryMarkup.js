import buildAuditCountBadgesMarkup from './buildAuditCountBadgesMarkup.js';
import buildExportSizeReportMarkup from './buildExportSizeReportMarkup.js';
import buildPublishNextStepsMarkup from './buildPublishNextStepsMarkup.js';
import buildPublishStatusMarkup from './buildPublishStatusMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildPublishSummaryMarkup = (preflightRecord, context = {}) => {
  const preflight = preflightRecord || { errorCount: 0, warningCount: 0, summaries: [], notes: [] };
  const summaryList = Array.isArray(preflight.summaries) ? preflight.summaries : [];
  const summaryRows = summaryList.map((auditSummary) =>
    [
      '<div class="gjs-db-list-item gjs-db-export-row">',
      '<span>' + escapeHtmlText(auditSummary.auditLabel || auditSummary.auditId || 'Checks') + '</span>',
      '<span>' + buildAuditCountBadgesMarkup(auditSummary.severityCounts) + '</span>',
      '</div>',
    ].join(''),
  );
  const noteList = Array.isArray(preflight.notes) ? preflight.notes.filter(Boolean) : [];
  const notesMarkup = noteList.length
    ? '<ul class="gjs-db-export-notes">' +
      noteList.map((noteText) => '<li class="gjs-db-field-help">' + escapeHtmlText(noteText) + '</li>').join('') +
      '</ul>'
    : '';
  const hasErrors = (Number(preflight.errorCount) || 0) > 0;
  const primaryLabel =
    context.primaryLabel ||
    (context.hasPublishHook ? 'Publish' : hasErrors ? 'Download anyway' : 'Download site (.zip)');
  return [
    '<div class="gjs-db-report gjs-db-publish-summary" data-db-publish-root>',
    buildPublishStatusMarkup(preflight),
    '<div class="gjs-db-section-title">Site checks</div>',
    summaryRows.length
      ? '<div class="gjs-db-list">' + summaryRows.join('') + '</div>'
      : '<div class="gjs-db-field-help">No checks are available for this site.</div>',
    notesMarkup,
    context.sizeReport ? buildExportSizeReportMarkup(context.sizeReport) : '',
    buildPublishNextStepsMarkup(),
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-publish-continue data-db-autofocus>' +
      escapeHtmlText(primaryLabel) +
      '</button>',
    '<button type="button" class="gjs-db-button" data-db-publish-report>Open audit report</button>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildPublishSummaryMarkup;
