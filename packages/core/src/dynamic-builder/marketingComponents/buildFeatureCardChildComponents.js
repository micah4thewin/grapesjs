import buildIconSvgMarkup from '../icons/buildIconSvgMarkup.js';
import getFeaturePresetRecords from './getFeaturePresetRecords.js';

const buildFeatureCardChildComponents = (presetRecord) => {
  const featurePreset = presetRecord || getFeaturePresetRecords()[0];
  return [
    {
      type: 'db-icon',
      name: 'Feature icon',
      draggable: false,
      classes: ['db-icon', 'db-feature-icon'],
      attributes: {
        'data-db-icon-name': featurePreset.iconName,
        'data-db-icon-size': '22',
        'data-db-icon-stroke': '2',
        'data-db-icon-decorative': 'true',
        'data-db-icon-label': '',
      },
      components: buildIconSvgMarkup({
        iconName: featurePreset.iconName,
        size: 22,
        strokeWidth: 2,
        isDecorative: true,
        accessibleLabel: '',
      }),
    },
    {
      tagName: 'h3',
      type: 'text',
      name: 'Feature title',
      classes: ['db-feature-title'],
      components: featurePreset.titleText,
    },
    {
      tagName: 'p',
      type: 'text',
      name: 'Feature text',
      classes: ['db-feature-text'],
      components: featurePreset.bodyText,
    },
  ];
};

export default buildFeatureCardChildComponents;
