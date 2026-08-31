const buildSeverityCountsMarkup = (severityCounts) => {
  const badgeDefinitions = [
    { severity: 'error', singularLabel: 'error', pluralLabel: 'errors', className: ' gjs-db-badge-error' },
    { severity: 'warning', singularLabel: 'warning', pluralLabel: 'warnings', className: ' gjs-db-badge-warning' },
    { severity: 'info', singularLabel: 'note', pluralLabel: 'notes', className: '' },
  ];
  return badgeDefinitions
    .map((badgeDefinition) => {
      const badgeCount = (severityCounts && severityCounts[badgeDefinition.severity]) || 0;
      const badgeLabel = badgeCount === 1 ? badgeDefinition.singularLabel : badgeDefinition.pluralLabel;
      return '<span class="gjs-db-badge' + badgeDefinition.className + '">' + badgeCount + ' ' + badgeLabel + '</span>';
    })
    .join(' ');
};

export default buildSeverityCountsMarkup;
