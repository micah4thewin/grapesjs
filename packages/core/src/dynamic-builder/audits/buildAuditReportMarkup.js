import buildAuditGroupMarkup from './buildAuditGroupMarkup.js';
import buildSeverityCountsMarkup from './buildSeverityCountsMarkup.js';
import countFindingsBySeverity from './countFindingsBySeverity.js';
import getAuditDefinitions from './getAuditDefinitions.js';
import getAuditResults from './getAuditResults.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildAuditReportMarkup = (editor) => {
  const auditResults = getAuditResults(editor);
  const auditDefinitions = getAuditDefinitions();
  const allFindings = auditDefinitions.flatMap((auditDefinition) => {
    const auditResult = auditResults[auditDefinition.id];
    return auditResult && Array.isArray(auditResult.findings) ? auditResult.findings : [];
  });
  const groupsMarkup = auditDefinitions
    .map((auditDefinition) => buildAuditGroupMarkup(auditDefinition, auditResults[auditDefinition.id]))
    .join('');
  return (
    '<div class="gjs-db-report gjs-db-audit-report">' +
    '<div class="gjs-db-audit-header">' +
    '<div class="gjs-db-audit-counts">' +
    buildSeverityCountsMarkup(countFindingsBySeverity(allFindings)) +
    '</div>' +
    '<div class="gjs-db-button-row">' +
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
