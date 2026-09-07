import buildAuditGroupMarkup from './buildAuditGroupMarkup.js';
import buildSeverityCountsMarkup from './buildSeverityCountsMarkup.js';
import countFindingsBySeverity from './countFindingsBySeverity.js';
import getAuditDefinitions from './getAuditDefinitions.js';
import getAuditResults from './getAuditResults.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildAuditReportMarkup = (editor) => {
  const auditResults = getAuditResults(editor);
  const auditDefinitions = getAuditDefinitions();
  const completedResults = auditDefinitions
    .map((auditDefinition) => auditResults[auditDefinition.id])
    .filter((auditResult) => auditResult && Array.isArray(auditResult.findings));
  const allFindings = completedResults.flatMap((auditResult) => auditResult.findings);
  const headerCountsMarkup = completedResults.length
    ? buildSeverityCountsMarkup(countFindingsBySeverity(allFindings))
    : '<span class="gjs-db-badge">Not run yet</span>' +
      '<span class="gjs-db-muted">Run a check to see what needs attention.</span>';
  const checksAllPages = editor.getModel().get('dbAuditScope') === 'site';
  const groupsMarkup = auditDefinitions
    .map((auditDefinition) => buildAuditGroupMarkup(auditDefinition, auditResults[auditDefinition.id]))
    .join('');
  return (
    '<div class="gjs-db-report gjs-db-audit-report" data-db-audit-report>' +
    '<div class="gjs-db-audit-header">' +
    '<div class="gjs-db-audit-counts">' +
    headerCountsMarkup +
    '</div>' +
    '<div class="gjs-db-button-row">' +
    '<label class="gjs-db-audit-scope"><input type="checkbox" data-db-audit-scope' +
    (checksAllPages ? ' checked' : '') +
    '> Check all pages</label>' +
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-audit-run-all="true">' +
    getIconMarkup('refresh', { size: 14 }) +
    'Run all</button>' +
    '</div>' +
    '</div>' +
    groupsMarkup +
    '</div>'
  );
};

export default buildAuditReportMarkup;
