const buildStatChildComponents = (statPreset) => {
  const prefixText = statPreset.prefix || '';
  const suffixText = statPreset.suffix || '';
  const displayText = prefixText + Number(statPreset.target).toLocaleString('en-US') + suffixText;
  return [
    {
      tagName: 'strong',
      name: 'Stat value',
      classes: ['db-stat-value'],
      attributes: {
        'data-db-stat-target': String(statPreset.target),
        'data-db-stat-prefix': prefixText,
        'data-db-stat-suffix': suffixText,
      },
      components: displayText,
      traits: [
        { type: 'number', name: 'data-db-stat-target', label: 'Target value', min: 0, step: 1 },
        { type: 'text', name: 'data-db-stat-prefix', label: 'Prefix' },
        { type: 'text', name: 'data-db-stat-suffix', label: 'Suffix' },
      ],
    },
    {
      tagName: 'span',
      type: 'text',
      name: 'Stat label',
      classes: ['db-stat-label'],
      components: statPreset.label,
    },
  ];
};

export default buildStatChildComponents;
