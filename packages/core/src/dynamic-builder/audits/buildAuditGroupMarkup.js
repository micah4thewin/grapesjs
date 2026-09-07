import buildFindingListMarkup from './buildFindingListMarkup.js';
import buildSeverityCountsMarkup from './buildSeverityCountsMarkup.js';
import countFindingsBySeverity from './countFindingsBySeverity.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import formatAuditRunTimeText from './formatAuditRunTimeText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildRunMetaMarkup = (auditResult) => {
  const timeText = formatAuditRunTimeText(auditResult.completedAt);
  const scopeText =
    auditResult.scope === 'site'
      ? 'across ' + (auditResult.pageCount || 1) + ' pages'
      : 'on "' + (auditResult.pageName || 'this page') + '"';
  return (
    '<span class="gjs-db-muted gjs-db-audit-meta">Last run ' + escapeHtmlText(timeText + ' ' + scopeText) + '</span>'
  );
};

const buildAuditGroupMarkup = (auditDefinition, auditResult) => {
  const findings = auditResult && Array.isArray(auditResult.findings) ? auditResult.findings : null;
  const countsMarkup = findings && findings.length ? buildSeverityCountsMarkup(countFindingsBySeverity(findings)) : '';
  const cleanMarkup =
    '<p class="gjs-db-audit-clean"><span class="gjs-db-badge gjs-db-badge-success">All clear</span>' +
    '<span class="gjs-db-muted">No ' +
    escapeHtmlText(auditDefinition.label.toLowerCase()) +
    ' issues found.</span></p>';
  const pendingMarkup =
    '<p class="gjs-db-muted gjs-db-audit-empty">Not run yet. Use Run to check the current page.</p>';
  const bodyMarkup = !findings ? pendingMarkup : findings.length ? buildFindingListMarkup(findings) : cleanMarkup;
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
    (findings ? 'Run again' : 'Run') +
    '</button>' +
    '</div>' +
    (findings ? buildRunMetaMarkup(auditResult) : '') +
    bodyMarkup +
    '</section>'
  );
};

export default buildAuditGroupMarkup;
