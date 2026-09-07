const getToolsMenuSections = () => [
  {
    sectionTitle: 'Design',
    commandIds: [
      'db:open-site-identity',
      'db:open-font-library',
      'db:open-custom-assets',
      'db:open-token-manager',
      'db:open-design-kits',
    ],
  },
  {
    sectionTitle: 'Content',
    commandIds: [
      'db:open-template-manager',
      'db:open-symbols',
      'db:open-flow-builder',
      'db:preview-animations',
      'db:open-photo-editor',
      'db:open-stock-photos',
      'db:open-data-sources',
    ],
  },
  {
    sectionTitle: 'Site',
    commandIds: [
      'db:open-site-manager',
      'db:open-site-settings',
      'db:open-seo-settings',
      'db:open-schema-manager',
      'db:open-custom-code',
    ],
  },
  {
    sectionTitle: 'Publish',
    commandIds: [
      'db:open-audit-report',
      'db:publish-site',
      'db:open-export',
      'db:preview-export',
      'db:open-revisions',
      'db:open-history',
    ],
  },
  { sectionTitle: 'Advanced', commandIds: ['core:open-code'] },
  { sectionTitle: 'Help', commandIds: ['db:open-shortcut-help'] },
];

export default getToolsMenuSections;
