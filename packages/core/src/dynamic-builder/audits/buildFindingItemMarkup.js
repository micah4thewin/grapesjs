import escapeHtmlText from '../support/escapeHtmlText.js';

const buildFindingItemMarkup = (findingRecord) => {
  const severityValue = findingRecord && findingRecord.severity ? String(findingRecord.severity) : 'info';
  const severityClassNames = { error: ' gjs-db-badge-error', warning: ' gjs-db-badge-warning', info: '' };
  const badgeClassName = severityClassNames[severityValue] || '';
  const severityLabel = severityValue.charAt(0).toUpperCase() + severityValue.slice(1);
  const groupText = findingRecord && findingRecord.group ? findingRecord.group : '';
  const groupMarkup = groupText ? '<span class="gjs-db-muted">' + escapeHtmlText(groupText) + ':</span> ' : '';
  const messageText = findingRecord && findingRecord.message ? findingRecord.message : '';
  const hintText = findingRecord && findingRecord.hint ? findingRecord.hint : '';
  const hintMarkup = hintText ? '<div class="gjs-db-muted">' + escapeHtmlText(hintText) + '</div>' : '';
  return (
    '<li class="gjs-db-list-item gjs-db-audit-finding">' +
    '<span class="gjs-db-badge' +
    badgeClassName +
    '">' +
    severityLabel +
    '</span>' +
    '<div class="gjs-db-audit-finding-body">' +
    '<div class="gjs-db-audit-finding-message">' +
    groupMarkup +
    escapeHtmlText(messageText) +
    '</div>' +
    hintMarkup +
    '</div>' +
    '</li>'
  );
};

export default buildFindingItemMarkup;
