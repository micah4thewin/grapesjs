const getDbCommandLabelRecords = () => ({
  'db:open-command-palette': { label: 'Open command palette', iconName: 'commandPalette', keywords: 'search actions' },
  'db:open-shortcut-help': { label: 'Keyboard shortcuts', iconName: 'keyboard', keywords: 'help keys bindings' },
  'db:open-seo-settings': { label: 'SEO settings', iconName: 'seo', keywords: 'meta title description search' },
  'db:open-schema-manager': { label: 'Schema manager', iconName: 'schema', keywords: 'structured data json-ld' },
  'db:open-export': { label: 'Export site', iconName: 'exportBundle', keywords: 'download publish bundle zip' },
  'db:open-revisions': { label: 'Project revisions', iconName: 'history', keywords: 'versions restore backup' },
  'db:save-revision': { label: 'Save revision', iconName: 'save', keywords: 'snapshot version store' },
  'db:open-audit-report': { label: 'Audits report', iconName: 'performance', keywords: 'quality checks review' },
  'db:run-accessibility-audit': { label: 'Run accessibility audit', iconName: 'eye', keywords: 'a11y aria contrast' },
  'db:run-performance-audit': { label: 'Run performance audit', iconName: 'performance', keywords: 'speed weight' },
  'db:run-seo-audit': { label: 'Run SEO audit', iconName: 'seo', keywords: 'meta headings search' },
  'db:open-data-sources': { label: 'Data sources', iconName: 'dataBinding', keywords: 'bindings collections' },
  'db:open-site-settings': { label: 'Site settings', iconName: 'settings', keywords: 'global meta site' },
  'db:open-custom-code': { label: 'Custom code', iconName: 'code', keywords: 'html css script embed' },
  'db:toggle-grid-overlay': { label: 'Toggle grid overlay', iconName: 'grid', keywords: 'columns guides layout' },
  'db:open-token-manager': { label: 'Design tokens', iconName: 'tokens', keywords: 'colors spacing variables' },
});

export default getDbCommandLabelRecords;
