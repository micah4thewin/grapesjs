const getQuickInsertRecords = () => [
  { id: 'heading', label: 'Heading', icon: 'heading', content: { type: 'db-heading' } },
  { id: 'text', label: 'Text', icon: 'text', content: { type: 'db-text' } },
  { id: 'button', label: 'Button', icon: 'button', content: { type: 'db-button' } },
  { id: 'image', label: 'Image', icon: 'image', content: { type: 'db-image' } },
  { id: 'list', label: 'List', icon: 'list', content: { type: 'db-list' } },
  { id: 'quote', label: 'Quote', icon: 'quote', content: { type: 'db-quote' } },
  { id: 'callout', label: 'Note', icon: 'info', content: { type: 'db-callout' } },
  { id: 'columns', label: 'Columns', icon: 'columns', content: { type: 'db-columns' } },
  { id: 'spacer', label: 'Spacer', icon: 'spacer', content: { type: 'db-spacer' } },
  { id: 'divider', label: 'Divider', icon: 'divider', content: { type: 'db-divider' } },
];

export default getQuickInsertRecords;
