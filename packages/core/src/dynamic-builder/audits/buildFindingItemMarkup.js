import escapeHtmlText from '../support/escapeHtmlText.js';
import getSeverityLabelRecords from './getSeverityLabelRecords.js';
import resolveAuditFixDefinition from './resolveAuditFixDefinition.js';

const buildActionButtonMarkup = (findingRecord, actionAttribute, actionValue, buttonLabel) =>
  '<button type="button" class="gjs-db-button" ' +
  actionAttribute +
  '="' +
  escapeHtmlText(actionValue) +
  '" data-db-audit-component="' +
  escapeHtmlText(findingRecord.componentId || '') +
  '" data-db-audit-page="' +
  escapeHtmlText(findingRecord.pageId || '') +
  '">' +
  escapeHtmlText(buttonLabel) +
  '</button>';

const buildFindingActionsMarkup = (findingRecord) => {
  const fixDefinition = resolveAuditFixDefinition(findingRecord.fixId);
  const fixMarkup = fixDefinition
    ? buildActionButtonMarkup(findingRecord, 'data-db-audit-fix', fixDefinition.id, fixDefinition.label)
    : '';
  const showMarkup = findingRecord.componentId
    ? buildActionButtonMarkup(findingRecord, 'data-db-audit-show', 'true', 'Show')
    : '';
  const actionsMarkup = fixMarkup + showMarkup;
  return actionsMarkup ? '<div class="gjs-db-audit-finding-actions">' + actionsMarkup + '</div>' : '';
};

const buildFindingItemMarkup = (findingRecord) => {
  const safeRecord = findingRecord || {};
  const labelRecords = getSeverityLabelRecords();
  const labelRecord = labelRecords[safeRecord.severity] || labelRecords.info;
  const groupMarkup = safeRecord.group
    ? '<span class="gjs-db-muted">' + escapeHtmlText(safeRecord.group) + ':</span> '
    : '';
  const hintMarkup = safeRecord.hint ? '<div class="gjs-db-muted">' + escapeHtmlText(safeRecord.hint) + '</div>' : '';
  return (
    '<li class="gjs-db-list-item gjs-db-audit-finding" data-db-audit-severity="' +
    escapeHtmlText(safeRecord.severity || 'info') +
    '">' +
    '<span class="gjs-db-badge' +
    labelRecord.className +
    '">' +
    labelRecord.label +
    '</span>' +
    '<div class="gjs-db-audit-finding-body">' +
    '<div class="gjs-db-audit-finding-message">' +
    groupMarkup +
    escapeHtmlText(safeRecord.message || '') +
    '</div>' +
    hintMarkup +
    buildFindingActionsMarkup(safeRecord) +
    '</div>' +
    '</li>'
  );
};

export default buildFindingItemMarkup;
