const getWorkspaceToolRecords = () => [
  {
    id: 'blocks',
    kind: 'pane',
    label: 'Blocks',
    iconName: 'blocks',
    command: 'core:open-blocks',
    hint: 'Drag a block onto the page to add it.',
  },
  {
    id: 'layers',
    kind: 'pane',
    label: 'Layers',
    iconName: 'layers',
    command: 'core:open-layers',
    hint: 'Everything on this page, top to bottom.',
  },
  {
    id: 'pages',
    kind: 'pane',
    label: 'Pages',
    iconName: 'file',
    command: '',
    hint: 'Switch between the pages of your site.',
  },
  { id: 'rail-divider', kind: 'divider', label: '', iconName: '', command: '', hint: '' },
  {
    id: 'templates',
    kind: 'command',
    label: 'Templates',
    iconName: 'layout',
    command: 'db:open-template-manager',
    hint: '',
  },
  { id: 'sites', kind: 'command', label: 'Sites', iconName: 'folder', command: 'db:open-site-manager', hint: '' },
  { id: 'assets', kind: 'command', label: 'Assets', iconName: 'assets', command: 'core:open-assets', hint: '' },
];

export default getWorkspaceToolRecords;
