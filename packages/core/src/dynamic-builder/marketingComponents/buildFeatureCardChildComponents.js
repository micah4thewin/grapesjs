import getIconMarkup from '../support/getIconMarkup.js';

const buildFeatureCardChildComponents = (iconName, titleText, bodyText) => [
  {
    tagName: 'span',
    name: 'Feature icon',
    classes: ['db-feature-icon'],
    components: getIconMarkup(iconName, { size: 22 }),
  },
  { tagName: 'h3', type: 'text', name: 'Feature title', classes: ['db-feature-title'], components: titleText },
  { tagName: 'p', type: 'text', name: 'Feature text', classes: ['db-feature-text'], components: bodyText },
];

export default buildFeatureCardChildComponents;
