const getAuditDefinitions = () => [
  { id: 'accessibility', label: 'Accessibility', commandId: 'db:run-accessibility-audit', iconName: 'eye' },
  { id: 'performance', label: 'Performance', commandId: 'db:run-performance-audit', iconName: 'performance' },
  { id: 'seo', label: 'SEO', commandId: 'db:run-seo-audit', iconName: 'seo' },
];

export default getAuditDefinitions;
