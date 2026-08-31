import buildFindingItemMarkup from './buildFindingItemMarkup.js';
import buildSeverityCountsMarkup from './buildSeverityCountsMarkup.js';
import countFindingsBySeverity from './countFindingsBySeverity.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildAuditGroupMarkup = (auditDefinition, auditResult) => {
  const findings = auditResult && Array.isArray(auditResult.findings) ? auditResult.findings : null;
  const countsMarkup = findings && findings.length ? buildSeverityCountsMarkup(countFindingsBySeverity(findings)) : '';
  const runButtonLabel = findings ? 'Re-run' : 'Run';
  const cleanMarkup =
    '<p class="gjs-db-audit-clean"><span class="gjs-db-badge gjs-db-badge-success">All clear</span>' +
    '<span class="gjs-db-muted">No ' +
    escapeHtmlText(auditDefinition.label.toLowerCase()) +
    ' issues found on this page.</span></p>';
  const pendingMarkup =
    '<p class="gjs-db-muted gjs-db-audit-empty">Not run yet. Use the run button to audit the current page.</p>';
  const bodyMarkup = !findings
    ? pendingMarkup
    : findings.length
      ? '<ul class="gjs-db-list">' +
        findings.map((findingRecord) => buildFindingItemMarkup(findingRecord)).join('') +
        '</ul>'
      : cleanMarkup;
  return (
    '<section class="gjs-db-report-group" data-db-audit-group="' +
    auditDefinition.id +
    '">' +
    '<div class="gjs-db-audit-group-head">' +
    '<span class="gjs-db-section-title">' +
    getIconMarkup(auditDefinition.iconName, { size: 15 }) +
    escapeHtmlText(auditDefinition.label) +
    '</span>' +
    '<span class="gjs-db-audit-counts">' +
    countsMarkup +
    '</span>' +
    '<button type="button" class="gjs-db-button" data-db-audit-run="' +
    auditDefinition.commandId +
    '">' +
    runButtonLabel +
    '</button>' +
    '</div>' +
    bodyMarkup +
    '</section>'
  );
};

export default buildAuditGroupMarkup;
