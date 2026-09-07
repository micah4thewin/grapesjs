const buildAnnouncementTraitDefinitions = () => [
  {
    type: 'checkbox',
    name: 'data-db-dismissible',
    label: 'Dismissible',
    valueTrue: 'true',
    valueFalse: 'false',
    default: 'true',
  },
  { type: 'text', name: 'data-db-link-text', label: 'Link text', placeholder: 'Shop now' },
  { type: 'db-url', name: 'data-db-link-href', label: 'Link URL', placeholder: 'https://example.com/sale or #offer' },
  { type: 'db-date', name: 'data-db-start-date', label: 'Show from' },
  { type: 'db-date', name: 'data-db-end-date', label: 'Show until' },
  {
    type: 'db-text-help',
    name: 'data-db-storage-key',
    label: 'Remember as',
    help: 'Visitors who close this bar will not see it again. Change this name to show the bar to everyone once more.',
  },
];

export default buildAnnouncementTraitDefinitions;
