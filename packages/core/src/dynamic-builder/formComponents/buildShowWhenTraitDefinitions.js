const showWhenCategory = { id: 'db-show-when', label: 'Show only when', open: false };

const buildShowWhenTraitDefinitions = () => [
  {
    type: 'db-field-picker',
    name: 'data-db-show-when-field',
    label: 'Another field',
    category: showWhenCategory,
  },
  {
    type: 'select',
    name: 'data-db-show-when-op',
    label: 'Condition',
    category: showWhenCategory,
    options: [
      { id: 'equals', label: 'is exactly' },
      { id: 'not-equals', label: 'is anything but' },
      { id: 'contains', label: 'contains' },
      { id: 'not-empty', label: 'is filled in or ticked' },
      { id: 'empty', label: 'is empty or unticked' },
    ],
  },
  {
    type: 'text',
    name: 'data-db-show-when-value',
    label: 'Value to compare',
    placeholder: 'e.g. yes',
    category: showWhenCategory,
  },
];

export default buildShowWhenTraitDefinitions;
