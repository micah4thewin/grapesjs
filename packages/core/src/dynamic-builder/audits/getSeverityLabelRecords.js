const getSeverityLabelRecords = () => ({
  error: { label: 'Error', singularLabel: 'error', pluralLabel: 'errors', className: ' gjs-db-badge-error' },
  warning: { label: 'Warning', singularLabel: 'warning', pluralLabel: 'warnings', className: ' gjs-db-badge-warning' },
  info: { label: 'Note', singularLabel: 'note', pluralLabel: 'notes', className: '' },
});

export default getSeverityLabelRecords;
