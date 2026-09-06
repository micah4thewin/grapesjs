const listAssetDescriptorRecords = (hasSiteScript) =>
  [
    { assetId: 'styles', fileName: 'styles.css', mimeType: 'text/css', label: 'Site stylesheet' },
    hasSiteScript
      ? { assetId: 'siteScript', fileName: 'site.js', mimeType: 'text/javascript', label: 'Site scripts' }
      : null,
    { assetId: 'sitemap', fileName: 'sitemap.xml', mimeType: 'application/xml', label: 'Sitemap' },
    { assetId: 'robots', fileName: 'robots.txt', mimeType: 'text/plain', label: 'Robots directives' },
    {
      assetId: 'project',
      fileName: 'project.json',
      mimeType: 'application/json',
      label: 'Project backup',
      isBackup: true,
    },
    {
      assetId: 'tokens',
      fileName: 'design-tokens.json',
      mimeType: 'application/json',
      label: 'Design tokens',
      isBackup: true,
    },
  ].filter(Boolean);

export default listAssetDescriptorRecords;
