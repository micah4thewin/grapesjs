const buildAuditCountBadgesMarkup = (severityCounts) => {
  const countsRecord = severityCounts || {};
  const badgeDefinitions = [
    { severityKey: 'error', singularLabel: 'error', pluralLabel: 'errors', className: 'gjs-db-badge-error' },
    { severityKey: 'warning', singularLabel: 'warning', pluralLabel: 'warnings', className: 'gjs-db-badge-warning' },
    { severityKey: 'info', singularLabel: 'note', pluralLabel: 'notes', className: '' },
  ];
  return badgeDefinitions
    .map((badgeDefinition) => {
      const badgeCount = Math.max(0, Number(countsRecord[badgeDefinition.severityKey]) || 0);
      const toneClass = badgeCount > 0 && badgeDefinition.className ? ' ' + badgeDefinition.className : '';
      const badgeLabel = badgeCount === 1 ? badgeDefinition.singularLabel : badgeDefinition.pluralLabel;
      return '<span class="gjs-db-badge' + toneClass + '">' + badgeCount + ' ' + badgeLabel + '</span>';
    })
    .join('');
};

export default buildAuditCountBadgesMarkup;
