const getIconTraitDefinitions = (defaultSettings) => [
  {
    type: 'db-icon-picker',
    name: 'data-db-icon-name',
    label: 'Icon',
    default: defaultSettings.iconName,
  },
  {
    type: 'db-slider',
    name: 'data-db-icon-size',
    label: 'Size (px)',
    min: 12,
    max: 96,
    step: 1,
    default: defaultSettings.size,
  },
  {
    type: 'db-slider',
    name: 'data-db-icon-stroke',
    label: 'Stroke width',
    min: 1,
    max: 3,
    step: 0.25,
    default: defaultSettings.strokeWidth,
  },
  {
    type: 'checkbox',
    name: 'data-db-icon-decorative',
    label: 'Decorative',
    valueTrue: 'true',
    valueFalse: '',
    default: 'true',
  },
  {
    type: 'text',
    name: 'data-db-icon-label',
    label: 'Accessible label',
    placeholder: 'Describe the icon meaning',
  },
];

export default getIconTraitDefinitions;
