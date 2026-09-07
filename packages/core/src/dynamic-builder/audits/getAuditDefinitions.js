const getAuditDefinitions = () => [
  {
    id: 'accessibility',
    label: 'Accessibility',
    commandId: 'db:run-accessibility-audit',
    iconName: 'eye',
    hasLayoutChecks: true,
  },
  {
    id: 'performance',
    label: 'Performance',
    commandId: 'db:run-performance-audit',
    iconName: 'performance',
    hasLayoutChecks: true,
  },
  { id: 'seo', label: 'SEO', commandId: 'db:run-seo-audit', iconName: 'seo', hasLayoutChecks: false },
];

export default getAuditDefinitions;
