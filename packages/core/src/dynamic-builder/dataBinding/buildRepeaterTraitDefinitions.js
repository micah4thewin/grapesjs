const buildRepeaterTraitDefinitions = (sourceNames) => [
  {
    type: 'select',
    name: 'data-db-source',
    label: 'Data source',
    options: sourceNames.map((sourceName) => ({ id: sourceName, label: sourceName })),
    default: 'products',
  },
  { type: 'number', name: 'data-db-limit', label: 'Limit (0 shows all)', min: 0, step: 1, default: 0 },
  { type: 'number', name: 'data-db-offset', label: 'Offset', min: 0, step: 1, default: 0 },
];

export default buildRepeaterTraitDefinitions;
