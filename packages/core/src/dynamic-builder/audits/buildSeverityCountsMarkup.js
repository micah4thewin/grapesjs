import getSeverityLabelRecords from './getSeverityLabelRecords.js';

const buildSeverityCountsMarkup = (severityCounts) =>
  Object.entries(getSeverityLabelRecords())
    .map(([severityValue, labelRecord]) => {
      const badgeCount = (severityCounts && severityCounts[severityValue]) || 0;
      const badgeLabel = badgeCount === 1 ? labelRecord.singularLabel : labelRecord.pluralLabel;
      return '<span class="gjs-db-badge' + labelRecord.className + '">' + badgeCount + ' ' + badgeLabel + '</span>';
    })
    .join(' ');

export default buildSeverityCountsMarkup;
