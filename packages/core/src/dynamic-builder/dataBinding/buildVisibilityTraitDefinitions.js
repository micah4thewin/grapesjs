const buildVisibilityTraitDefinitions = () => [
  {
    type: 'db-condition',
    name: 'data-db-condition',
    label: 'Show this element',
    category: { id: 'db-visibility', label: 'Visibility', open: false },
  },
];

export default buildVisibilityTraitDefinitions;
