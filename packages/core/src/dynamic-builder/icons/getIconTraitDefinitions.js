import buildIconTraitCategory from './buildIconTraitCategory.js';

const getIconTraitDefinitions = (defaultSettings) => {
  const iconCategory = buildIconTraitCategory();
  return [
    {
      type: 'db-icon-picker',
      name: 'data-db-icon-name',
      label: 'Icon',
      default: defaultSettings.iconName,
      category: iconCategory,
    },
    {
      type: 'db-slider',
      name: 'data-db-icon-size',
      label: 'Size (px)',
      min: 12,
      max: 96,
      step: 1,
      default: defaultSettings.size,
      category: iconCategory,
    },
    {
      type: 'db-slider',
      name: 'data-db-icon-stroke',
      label: 'Line thickness',
      min: 1,
      max: 3,
      step: 0.25,
      default: defaultSettings.strokeWidth,
      category: iconCategory,
    },
    { type: 'color', name: 'data-db-icon-color', label: 'Colour', category: iconCategory },
    {
      type: 'checkbox',
      name: 'data-db-icon-decorative',
      label: 'Decorative (hidden from screen readers)',
      valueTrue: 'true',
      valueFalse: 'false',
      default: 'true',
      category: iconCategory,
    },
    {
      type: 'text',
      name: 'data-db-icon-label',
      label: 'Label for screen readers',
      placeholder: 'What the icon means, like Call us',
      category: iconCategory,
    },
  ];
};

export default getIconTraitDefinitions;
