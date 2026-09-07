import getIconMarkup from '../support/getIconMarkup.js';
import getLockedChildProps from './getLockedChildProps.js';

const buildMapPlaceholderChildren = () => [
  {
    tagName: 'div',
    name: 'Map placeholder',
    classes: ['db-map-placeholder'],
    ...getLockedChildProps(),
    components: [
      {
        tagName: 'span',
        classes: ['db-map-pin'],
        ...getLockedChildProps(),
        components: getIconMarkup('map', { size: 28 }),
      },
      {
        tagName: 'p',
        classes: ['db-map-address'],
        ...getLockedChildProps(),
        attributes: { 'data-db-map-address': 'true' },
        components: 'London, United Kingdom',
      },
      {
        tagName: 'button',
        classes: ['db-facade-button'],
        ...getLockedChildProps(),
        attributes: { type: 'button', 'data-db-map-load': 'true' },
        components: 'Load interactive map',
      },
      {
        tagName: 'p',
        classes: ['db-facade-note'],
        ...getLockedChildProps(),
        attributes: { 'data-db-map-note': 'true' },
        components: 'The map loads from OpenStreetMap only after you choose to view it.',
      },
    ],
  },
];

export default buildMapPlaceholderChildren;
